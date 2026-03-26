import { describe, it, expect } from 'vitest'
import { getEntries, saveEntries } from './storage'

describe('storage', () => {
  it('returns empty array for unknown date', () => {
    expect(getEntries('2026-01-01')).toEqual([])
  })

  it('round-trips entries', () => {
    const entries = [
      { id: '1', name: 'Chicken', calories: 280, protein: 52 },
    ]
    saveEntries('2026-01-01', entries)
    expect(getEntries('2026-01-01')).toEqual(entries)
  })
})
