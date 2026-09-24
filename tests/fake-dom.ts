/**
 * Minimal document.documentElement stand-in — just enough of classList +
 * style.setProperty for settings.ts's applySettings()/the prepaint script to
 * run against in plain node:test (no jsdom dependency in this repo).
 */
export function fakeDocument() {
  const classes = new Set<string>()
  const styles = new Map<string, string>()
  const documentElement = {
    classList: {
      add: (c: string) => classes.add(c),
      remove: (c: string) => classes.delete(c),
      contains: (c: string) => classes.has(c),
    },
    style: {
      setProperty: (name: string, value: string) => styles.set(name, value),
      getPropertyValue: (name: string) => styles.get(name) ?? '',
    },
  }
  return { documentElement, classes, styles }
}

/** Minimal window.localStorage stand-in that can be told to throw, to
 * exercise the try/catch paths in loadSettings()/saveSettings() and in the
 * prepaint script. */
export function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (k: string) => (data.has(k) ? (data.get(k) as string) : null),
    setItem: (k: string, v: string) => {
      data.set(k, v)
    },
    removeItem: (k: string) => {
      data.delete(k)
    },
    raw: data,
  }
}

export function throwingStorage(): { getItem: () => never; setItem: () => never } {
  return {
    getItem: () => {
      throw new Error('blocked')
    },
    setItem: () => {
      throw new Error('blocked')
    },
  }
}
