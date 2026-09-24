/**
 * Runs as an inline <script> at the very top of <body>, before the page
 * content wrapper (or anything else) is parsed — same technique as
 * LakesideShell's `prePaint` script. Reads the persisted a11y settings and
 * sets the <html> classes + --a11y-zoom custom property synchronously, so
 * text size / reduced motion / contrast / etc are correct on the very first
 * paint (no flash of unstyled/unscaled content).
 *
 * This is hand-written plain JS (no imports — it has to run standalone as
 * script text) but it MUST stay behaviourally identical to
 * sanitizeSettings() + applySettings() in ./settings.ts. tests/a11y-prepaint
 * .test.ts runs this exact string through the same fixtures as settings.ts
 * to catch drift.
 */
export const A11Y_PREPAINT_SCRIPT = `(function(){
  try {
    var KEY = 'ba-a11y-settings-v1';
    var raw = window.localStorage.getItem(KEY);
    if (!raw) return;
    var s = JSON.parse(raw);
    if (!s || typeof s !== 'object') return;
    var html = document.documentElement;
    var scales = [1, 1.125, 1.25, 1.5];
    var scale = scales.indexOf(s.textScale) > -1 ? s.textScale : 1;
    if (s.reduceMotion === true) html.classList.add('a11y-reduce-motion');
    if (s.highContrast === true) html.classList.add('a11y-contrast');
    if (s.underlineLinks === true) html.classList.add('a11y-underline-links');
    if (s.readableFont === true) html.classList.add('a11y-readable-font');
    if (s.lineSpacing === 'relaxed') html.classList.add('a11y-spacing-relaxed');
    html.style.setProperty('--a11y-zoom', String(scale));
  } catch (e) {}
})();`
