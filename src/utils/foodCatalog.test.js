import { describe, it, expect } from 'vitest'
import { getCatalog, updateCatalog, searchCatalog, getAllCatalogItems } from './foodCatalog'

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
    expect(results[0]).toMatchObject({
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

  it('getAllCatalogItems returns all items', () => {
    expect(getAllCatalogItems()).toEqual([])
    updateCatalog({ name: 'Chicken', calories: 280, protein: 52 })
    updateCatalog({ name: 'Rice', calories: 200, protein: 4 })
    const items = getAllCatalogItems()
    expect(items).toHaveLength(2)
    expect(items.map((i) => i.name).sort()).toEqual(['Chicken', 'Rice'])
  })

  it('stores per-gram rates when amount provided', () => {
    updateCatalog({ name: 'Chicken', calories: 280, protein: 52, amount: 150 })
    const items = getAllCatalogItems()
    expect(items[0].amount).toBe(150)
    expect(items[0].caloriesPerGram).toBeCloseTo(1.867, 2)
    expect(items[0].proteinPerGram).toBeCloseTo(0.347, 2)
  })

  it('stores null rates when no amount provided', () => {
    updateCatalog({ name: 'Coffee', calories: 5, protein: 0 })
    const items = getAllCatalogItems()
    expect(items[0].amount).toBeNull()
    expect(items[0].caloriesPerGram).toBeNull()
    expect(items[0].proteinPerGram).toBeNull()
  })
})
