/**
 * Walks a page's <main> element and pulls out the blocks the Reader should
 * speak. Operates on standard DOM `Element` methods only (no browser-only
 * globals like `NodeFilter`), so it runs the same way against a real DOM and
 * against jsdom in tests (see tests/reader-extractor.test.ts).
 */

export interface ReadableBlock {
  el: Element
  text: string
  isHeading: boolean
}

const SKIP_TAGS = new Set([
  'NAV', 'HEADER', 'FOOTER', 'BUTTON', 'FORM', 'INPUT', 'SELECT', 'TEXTAREA',
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'IFRAME', 'TEMPLATE',
])

const TEXT_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'FIGCAPTION', 'TD', 'TH'])
const HEADING_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6'])

function isSkippable(el: Element): boolean {
  if (SKIP_TAGS.has(el.tagName)) return true
  if (el.hasAttribute('data-reader-skip')) return true
  if (el.hasAttribute('hidden')) return true
  if (el.getAttribute('aria-hidden') === 'true') return true
  const type = el.getAttribute('type')
  if (el.tagName === 'INPUT' && type === 'hidden') return true
  return false
}

/** Inline-style visibility checks only; computed styles need a real browser
 * and this must also work against jsdom, which doesn't compute layout. */
function isInlineHidden(el: Element): boolean {
  const style = (el as HTMLElement).style
  if (!style) return false
  return style.display === 'none' || style.visibility === 'hidden'
}

/**
 * Walks `root` (normally the page's <main>) in DOM order and returns one
 * block per heading, paragraph, list item, figcaption and table cell. Skips
 * nav/header/footer/form controls/buttons, hidden or aria-hidden nodes, and
 * any subtree marked [data-reader-skip] (the chat assistant, the reader's own
 * controls). Does not recurse into a captured block's descendants, so a link
 * or nested element inside a <p> or <li> isn't read a second time.
 */
export function extractReadableBlocks(root: Element): ReadableBlock[] {
  const blocks: ReadableBlock[] = []

  function walk(node: Element) {
    if (isSkippable(node) || isInlineHidden(node)) return

    if (TEXT_TAGS.has(node.tagName)) {
      const text = (node.textContent ?? '').replace(/\s+/g, ' ').trim()
      if (text) blocks.push({ el: node, text, isHeading: HEADING_TAGS.has(node.tagName) })
      return
    }

    for (const child of Array.from(node.children)) {
      walk(child)
    }
  }

  walk(root)
  return blocks
}
