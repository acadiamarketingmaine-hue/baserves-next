/**
 * DOM-walking tests for the Reader's extractor, against jsdom (already a
 * dependency of this repo) rather than a real browser.
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'

import { extractReadableBlocks } from '../src/components/reader/extractor.ts'

function main(html: string) {
  const dom = new JSDOM(`<!doctype html><body><main>${html}</main></body>`)
  return dom.window.document.querySelector('main')!
}

test('extractReadableBlocks: reads headings, paragraphs and list items in DOM order', () => {
  const root = main(`
    <h2>About Long Lake</h2>
    <p>Sixteen cabins on a private lake.</p>
    <ul><li>Private Lake Access</li><li>Commercial Kitchen</li></ul>
  `)
  const blocks = extractReadableBlocks(root)
  assert.deepEqual(
    blocks.map((b) => [b.el.tagName, b.text, b.isHeading]),
    [
      ['H2', 'About Long Lake', true],
      ['P', 'Sixteen cabins on a private lake.', false],
      ['LI', 'Private Lake Access', false],
      ['LI', 'Commercial Kitchen', false],
    ],
  )
})

test('extractReadableBlocks: reads figcaptions and table cells', () => {
  const root = main(`
    <figure><img src="a.jpg" alt="a"><figcaption>The lodge at dusk</figcaption></figure>
    <table><tr><td>Cabins</td><th>16</th></tr></table>
  `)
  const blocks = extractReadableBlocks(root)
  assert.deepEqual(blocks.map((b) => b.text), ['The lodge at dusk', 'Cabins', '16'])
})

test('extractReadableBlocks: skips nav, header, footer, buttons and form controls', () => {
  const root = main(`
    <nav><p>Nav paragraph</p></nav>
    <header><p>Header paragraph</p></header>
    <p>Real paragraph.</p>
    <button>Click me</button>
    <form><input value="x"><textarea>ignored</textarea><p>Form paragraph</p></form>
    <footer><p>Footer paragraph</p></footer>
  `)
  const blocks = extractReadableBlocks(root)
  assert.deepEqual(blocks.map((b) => b.text), ['Real paragraph.'])
})

test('extractReadableBlocks: skips hidden, aria-hidden and [data-reader-skip] subtrees', () => {
  const root = main(`
    <p>Visible paragraph.</p>
    <p hidden>Hidden paragraph.</p>
    <div aria-hidden="true"><p>Aria hidden paragraph.</p></div>
    <div data-reader-skip><p>Skipped chat widget text.</p></div>
    <p style="display:none">Inline hidden paragraph.</p>
  `)
  const blocks = extractReadableBlocks(root)
  assert.deepEqual(blocks.map((b) => b.text), ['Visible paragraph.'])
})

test('extractReadableBlocks: does not recurse into a captured block (no duplicate text)', () => {
  const root = main(`
    <a href="/x" class="lk-card"><h3>Camp Rules</h3><p>Rules and guidelines for your stay.</p></a>
  `)
  const blocks = extractReadableBlocks(root)
  assert.deepEqual(
    blocks.map((b) => b.text),
    ['Camp Rules', 'Rules and guidelines for your stay.'],
  )
})

test('extractReadableBlocks: skips empty/whitespace-only blocks', () => {
  const root = main(`<p>   </p><p>Real content.</p>`)
  const blocks = extractReadableBlocks(root)
  assert.deepEqual(blocks.map((b) => b.text), ['Real content.'])
})

test('extractReadableBlocks: an empty <main> returns no blocks', () => {
  const root = main('')
  assert.deepEqual(extractReadableBlocks(root), [])
})
