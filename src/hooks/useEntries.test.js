import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useEntries } from './useEntries'
import { getEntries } from '../utils/storage'
import { getAllCatalogItems } from '../utils/foodCatalog'

const DATE = '2026-03-26'

describe('useEntries', () => {
  it('returns empty entries and zero totals initially', () => {
    const { result } = renderHook(() => useEntries(DATE))
    expect(result.current.entries).toEqual([])
    expect(result.current.totals).toEqual({ calories: 0, protein: 0 })
  })

  it('addEntry persists to storage and updates state', () => {
    const { result } = renderHook(() => useEntries(DATE))

    act(() => {
      result.current.addEntry({ name: 'Chicken', calories: 280, protein: 52 })
    })

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].name).toBe('Chicken')
    expect(result.current.entries[0].calories).toBe(280)

    // Verify persisted to storage
    const stored = getEntries(DATE)
    expect(stored).toHaveLength(1)
    expect(stored[0].name).toBe('Chicken')
  })

  it('addEntry generates id and timestamp', () => {
    const { result } = renderHook(() => useEntries(DATE))

    act(() => {
      result.current.addEntry({ name: 'Rice', calories: 200, protein: 4 })
    })

    const entry = result.current.entries[0]
    expect(entry.id).toBeDefined()
    expect(typeof entry.id).toBe('string')
    expect(entry.timestamp).toBeDefined()
  })

  it('addEntry updates the food catalog', () => {
    const { result } = renderHook(() => useEntries(DATE))

    act(() => {
      result.current.addEntry({ name: 'Chicken', calories: 280, protein: 52 })
    })

    const catalog = getAllCatalogItems()
    expect(catalog).toHaveLength(1)
    expect(catalog[0].name).toBe('Chicken')
  })

  it('deleteEntry removes the correct entry', () => {
    const { result } = renderHook(() => useEntries(DATE))

    act(() => {
      result.current.addEntry({ name: 'Chicken', calories: 280, protein: 52 })
      result.current.addEntry({ name: 'Rice', calories: 200, protein: 4 })
    })

    const chickenId = result.current.entries.find((e) => e.name === 'Chicken').id

    act(() => {
      result.current.deleteEntry(chickenId)
    })

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].name).toBe('Rice')

    // Verify persisted
    const stored = getEntries(DATE)
    expect(stored).toHaveLength(1)
    expect(stored[0].name).toBe('Rice')
  })

  it('totals sums calories and protein', () => {
    const { result } = renderHook(() => useEntries(DATE))

    act(() => {
      result.current.addEntry({ name: 'Chicken', calories: 280, protein: 52 })
      result.current.addEntry({ name: 'Rice', calories: 200, protein: 4 })
    })

    expect(result.current.totals).toEqual({ calories: 480, protein: 56 })
  })

  it('reload re-reads entries from storage', () => {
    const { result } = renderHook(() => useEntries(DATE))

    act(() => {
      result.current.addEntry({ name: 'Chicken', calories: 280, protein: 52 })
    })

    expect(result.current.entries).toHaveLength(1)

    act(() => {
      result.current.reload()
    })

    // Still has the entry (it's in storage)
    expect(result.current.entries).toHaveLength(1)
  })
})
