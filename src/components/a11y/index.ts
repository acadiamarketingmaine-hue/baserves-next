/**
 * Floating accessibility & reader-control panel (text size, stop animations,
 * reading tools, contrast, underline links, line spacing, readable font).
 * See docs/ux-pass/kit-v2.md "Accessibility" section.
 */
export { default as A11yWidget } from './A11yWidget'
export { A11Y_PREPAINT_SCRIPT } from './prepaint'
export { useReducedMotion } from './useReducedMotion'
export {
  ALL_TOGGLE_CLASSES,
  DEFAULT_SETTINGS,
  REDUCE_MOTION_EVENT,
  STORAGE_KEY,
  TEXT_SCALES,
  ZOOM_VAR,
  applySettings,
  classesFor,
  loadSettings,
  sanitizeSettings,
  saveSettings,
  type A11ySettings,
  type LineSpacing,
  type TextScale,
} from './settings'
