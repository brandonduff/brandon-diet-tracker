import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Diet Tracker')).toBeInTheDocument()
  })

  it('adds an entry and updates totals', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Totals start at zero
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('0g')).toBeInTheDocument()
    expect(screen.getByText('No entries yet')).toBeInTheDocument()

    // Add an entry
    await user.type(screen.getByLabelText('Food name'), 'Chicken')
    await user.type(screen.getByLabelText('Calories'), '280')
    await user.type(screen.getByLabelText('Protein (g)'), '52')
    await user.click(screen.getByText('Add'))

    // Entry appears in list (check the detail line which is unique to the entry list)
    expect(screen.getByText('280 cal · 52g protein')).toBeInTheDocument()
    expect(screen.getByLabelText('Delete Chicken')).toBeInTheDocument()

    // Empty state gone
    expect(screen.queryByText('No entries yet')).not.toBeInTheDocument()
  })

  it('deletes an entry and updates totals', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add two entries
    await user.type(screen.getByLabelText('Food name'), 'Chicken')
    await user.type(screen.getByLabelText('Calories'), '280')
    await user.type(screen.getByLabelText('Protein (g)'), '52')
    await user.click(screen.getByText('Add'))

    await user.type(screen.getByLabelText('Food name'), 'Rice')
    await user.type(screen.getByLabelText('Calories'), '200')
    await user.type(screen.getByLabelText('Protein (g)'), '4')
    await user.click(screen.getByText('Add'))

    expect(screen.getByText('480')).toBeInTheDocument()
    expect(screen.getByText('56g')).toBeInTheDocument()

    // Delete Chicken
    await user.click(screen.getByLabelText('Delete Chicken'))

    expect(screen.queryByText('Chicken')).not.toBeInTheDocument()
    expect(screen.getByText('Rice')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('4g')).toBeInTheDocument()
  })

  it('added entry appears in autocomplete suggestions', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Add an entry
    await user.type(screen.getByLabelText('Food name'), 'Chicken breast')
    await user.type(screen.getByLabelText('Calories'), '280')
    await user.type(screen.getByLabelText('Protein (g)'), '52')
    await user.click(screen.getByText('Add'))

    // Start typing same food — should see autocomplete suggestion
    await user.type(screen.getByLabelText('Food name'), 'Chick')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('option')).toHaveTextContent('Chicken breast')
  })
})
