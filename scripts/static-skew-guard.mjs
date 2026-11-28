// Sits in front of the Next standalone server.
// A missing /_next/static file must be a non-cacheable plain 404.
// It must never be the HTML app shell (browsers then refuse the stylesheet,
// and a shared cache can pin that HTML for a year).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const STATIC_ROOT = path.resolve(".next/static");
const listenPort = process.env.PORT || "3000";
const upstreamPort = String(Number(listenPort) + 1);

export function staticFile(urlPath) {
  const raw = (urlPath || "/").split("?")[0];
  if (!raw.startsWith("/_next/static/")) return null;
  let rel = raw.slice("/_next/static/".length);
  try {
    rel = decodeURIComponent(rel);
  } catch {
    return false;
  }
  if (rel.includes("\0") || path.isAbsolute(rel)) return false;
  const file = path.resolve(STATIC_ROOT, rel);
  if (file !== STATIC_ROOT && !file.startsWith(STATIC_ROOT + path.sep)) return false;
  try {
    if (!fs.statSync(file).isFile()) return false;
  } catch {
    return false;
  }
  return file;
}

function plain404(res) {
  res.writeHead(404, {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end("Not found");
}

function listen() {
  const server = http.createServer((req, res) => {
    const found = staticFile(req.url);
    if (found === false) return plain404(res);
    const headers = { ...req.headers };
    const preq = http.request(
      {
        hostname: "127.0.0.1",
        port: upstreamPort,
        path: req.url,
        method: req.method,
        headers,
      },
      (pres) => {
        const out = { ...pres.headers };
        const type = String(out["content-type"] || "");
        if (type.includes("text/html")) {
          // Next's default SWR window is about a year. A shared cache would
          // keep one release's HTML, whose CSS hashes the next image lacks.
          out["cache-control"] = "public, max-age=0, s-maxage=60, stale-while-revalidate=60";
        }
        res.writeHead(pres.statusCode || 502, out);
        pres.pipe(res);
      },
    );
    preq.on("error", () => {
      if (!res.headersSent) {
        res.writeHead(502, { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" });
        res.end("Bad gateway");
      }
    });
    req.pipe(preq);
  });
  server.listen(Number(listenPort), "0.0.0.0");
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const child = spawn(process.execPath, ["server.js"], {
    stdio: "inherit",
    env: { ...process.env, PORT: upstreamPort },
  });
  child.on("exit", (code) => process.exit(code ?? 1));
  listen();
}
