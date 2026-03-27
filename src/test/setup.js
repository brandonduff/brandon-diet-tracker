import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/svelte'

// Node 25 localStorage polyfill
const store = new Map()
const storageMock = {
  getItem: (key) => store.get(key) ?? null,
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear(),
  get length() { return store.size },
  key: (i) => [...store.keys()][i] ?? null,
}

Object.defineProperty(globalThis, 'localStorage', { value: storageMock, writable: true })
Object.defineProperty(window, 'localStorage', { value: storageMock, writable: true })

afterEach(() => {
  cleanup()
  store.clear()
})
