import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import Autocomplete from './Autocomplete.svelte'

const suggestions = [
  { name: 'Chicken breast', calories: 280, protein: 52 },
  { name: 'Chicken thigh', calories: 220, protein: 28 },
  { name: 'Rice', calories: 200, protein: 4 },
]

describe('Autocomplete', () => {
  it('shows matching suggestions when typing', async () => {
    const user = userEvent.setup()
    render(Autocomplete, {
      props: { value: '', onChange: () => {}, suggestions, onSelect: () => {}, placeholder: 'Food name' },
    })

    await user.click(screen.getByLabelText('Food name'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('filters suggestions by input value', async () => {
    const user = userEvent.setup()
    render(Autocomplete, {
      props: { value: 'chick', onChange: () => {}, suggestions, onSelect: () => {}, placeholder: 'Food name' },
    })

    await user.click(screen.getByLabelText('Food name'))
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveTextContent('Chicken breast')
    expect(options[1]).toHaveTextContent('Chicken thigh')
    expect(screen.queryByText('Rice')).not.toBeInTheDocument()
  })

  it('calls onSelect when a suggestion is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(Autocomplete, {
      props: { value: '', onChange: () => {}, suggestions, onSelect, placeholder: 'Food name' },
    })

    await user.click(screen.getByLabelText('Food name'))
    await user.click(screen.getByText('Rice'))
    expect(onSelect).toHaveBeenCalledWith({
      name: 'Rice',
      calories: 200,
      protein: 4,
    })
  })

  it('sorts prefix matches before substring matches', async () => {
    const user = userEvent.setup()
    const mixedSuggestions = [
      { name: 'Fried chicken', calories: 300, protein: 30 },
      { name: 'Chicken breast', calories: 280, protein: 52 },
    ]

    render(Autocomplete, {
      props: { value: 'chicken', onChange: () => {}, suggestions: mixedSuggestions, onSelect: () => {}, placeholder: 'Food name' },
    })

    await user.click(screen.getByLabelText('Food name'))
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveTextContent('Chicken breast')
    expect(options[1]).toHaveTextContent('Fried chicken')
  })

  it('caps visible suggestions at 8', async () => {
    const user = userEvent.setup()
    const manySuggestions = Array.from({ length: 12 }, (_, i) => ({
      name: `Food ${i + 1}`,
      calories: 100,
      protein: 10,
    }))

    render(Autocomplete, {
      props: { value: '', onChange: () => {}, suggestions: manySuggestions, onSelect: () => {}, placeholder: 'Food name' },
    })

    await user.click(screen.getByLabelText('Food name'))
    expect(screen.getAllByRole('option')).toHaveLength(8)
  })

  it('hides suggestions when no matches', async () => {
    const user = userEvent.setup()
    render(Autocomplete, {
      props: { value: 'xyz', onChange: () => {}, suggestions, onSelect: () => {}, placeholder: 'Food name' },
    })

    await user.click(screen.getByLabelText('Food name'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
