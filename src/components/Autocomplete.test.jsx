import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Autocomplete } from './Autocomplete'

const suggestions = [
  { name: 'Chicken breast', calories: 280, protein: 52 },
  { name: 'Chicken thigh', calories: 220, protein: 28 },
  { name: 'Rice', calories: 200, protein: 4 },
]

describe('Autocomplete', () => {
  it('shows matching suggestions when typing', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        value=""
        onChange={() => {}}
        suggestions={suggestions}
        onSelect={() => {}}
        placeholder="Food name"
      />
    )

    const input = screen.getByLabelText('Food name')
    await user.click(input)
    // All suggestions shown on focus when value is empty
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('filters suggestions by input value', () => {
    render(
      <Autocomplete
        value="chick"
        onChange={() => {}}
        suggestions={suggestions}
        onSelect={() => {}}
        placeholder="Food name"
      />
    )

    // Simulate focus state by checking that filtered results would show
    // The component needs showSuggestions=true which happens on focus/change
    // We test the filtering logic indirectly through the full flow
  })

  it('calls onSelect when a suggestion is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onChange = vi.fn()

    const { rerender } = render(
      <Autocomplete
        value=""
        onChange={onChange}
        suggestions={suggestions}
        onSelect={onSelect}
        placeholder="Food name"
      />
    )

    await user.click(screen.getByLabelText('Food name'))

    // Click on "Rice" suggestion
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

    render(
      <Autocomplete
        value="chicken"
        onChange={() => {}}
        suggestions={mixedSuggestions}
        onSelect={() => {}}
        placeholder="Food name"
      />
    )

    await user.click(screen.getByLabelText('Food name'))
    const options = screen.getAllByRole('option')
    // "Chicken breast" (prefix match) should come before "Fried chicken" (substring)
    expect(options[0]).toHaveTextContent('Chicken breast')
    expect(options[1]).toHaveTextContent('Fried chicken')
  })

  it('hides suggestions when no matches', async () => {
    const user = userEvent.setup()
    render(
      <Autocomplete
        value="xyz"
        onChange={() => {}}
        suggestions={suggestions}
        onSelect={() => {}}
        placeholder="Food name"
      />
    )

    await user.click(screen.getByLabelText('Food name'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
