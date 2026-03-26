import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EntryList } from './EntryList'

describe('EntryList', () => {
  it('shows empty message when no entries', () => {
    render(<EntryList entries={[]} />)
    expect(screen.getByText('No entries yet')).toBeInTheDocument()
  })

  it('renders entries', () => {
    const entries = [
      { id: '1', name: 'Chicken', calories: 280, protein: 52 },
      { id: '2', name: 'Rice', calories: 200, protein: 4 },
    ]
    render(<EntryList entries={entries} />)
    expect(screen.getByText('Chicken')).toBeInTheDocument()
    expect(screen.getByText('Rice')).toBeInTheDocument()
  })
})
