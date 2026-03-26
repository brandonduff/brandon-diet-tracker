import { describe, it, expect } from 'vitest'
import { getCatalog, updateCatalog, searchCatalog } from './foodCatalog'

describe('foodCatalog', () => {
  it('returns empty array when catalog is empty', () => {
    expect(searchCatalog('chicken')).toEqual([])
  })

  it('returns empty array for empty query', () => {
    expect(searchCatalog('')).toEqual([])
  })

  it('finds matching items after update', () => {
    updateCatalog({ name: 'Chicken breast', calories: 280, protein: 52 })
    const results = searchCatalog('chicken')
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual({
      name: 'Chicken breast',
      calories: 280,
      protein: 52,
    })
  })

  it('updates existing entry with new values', () => {
    updateCatalog({ name: 'Chicken breast', calories: 280, protein: 52 })
    updateCatalog({ name: 'Chicken breast', calories: 300, protein: 55 })
    const results = searchCatalog('chicken')
    expect(results).toHaveLength(1)
    expect(results[0].calories).toBe(300)
  })
})
