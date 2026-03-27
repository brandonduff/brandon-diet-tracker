import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('displays amount when present', () => {
    const entries = [
      { id: '1', name: 'Chicken', amount: 150, calories: 280, protein: 52 },
    ]
    render(<EntryList entries={entries} />)
    expect(screen.getByText('150g · 280 cal · 52g protein')).toBeInTheDocument()
  })

  it('displays without amount when absent', () => {
    const entries = [
      { id: '1', name: 'Coffee', calories: 5, protein: 0 },
    ]
    render(<EntryList entries={entries} />)
    expect(screen.getByText('5 cal · 0g protein')).toBeInTheDocument()
  })

  it('calls onDelete with correct id when delete button clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    const entries = [
      { id: '1', name: 'Chicken', calories: 280, protein: 52 },
      { id: '2', name: 'Rice', calories: 200, protein: 4 },
    ]
    render(<EntryList entries={entries} onDelete={onDelete} />)

    await user.click(screen.getByLabelText('Delete Chicken'))
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('hides delete buttons when onDelete is not provided', () => {
    const entries = [
      { id: '1', name: 'Chicken', calories: 280, protein: 52 },
    ]
    render(<EntryList entries={entries} />)
    expect(screen.queryByLabelText('Delete Chicken')).not.toBeInTheDocument()
  })
})
