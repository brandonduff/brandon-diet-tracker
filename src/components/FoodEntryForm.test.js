import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import FoodEntryForm from './FoodEntryForm.svelte'

describe('FoodEntryForm', () => {
  it('renders input fields and submit button', () => {
    render(FoodEntryForm)
    expect(screen.getByLabelText('Food name')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount (g)')).toBeInTheDocument()
    expect(screen.getByLabelText('Calories')).toBeInTheDocument()
    expect(screen.getByLabelText('Protein (g)')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  it('submits without amount', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(FoodEntryForm, { props: { onAdd } })

    await user.type(screen.getByLabelText('Food name'), 'Coffee')
    await user.type(screen.getByLabelText('Calories'), '5')
    await user.click(screen.getByText('Add'))

    expect(onAdd).toHaveBeenCalledWith({
      name: 'Coffee',
      calories: 5,
      protein: 0,
    })
  })

  it('submits with amount when provided', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(FoodEntryForm, { props: { onAdd } })

    await user.type(screen.getByLabelText('Food name'), 'Chicken')
    await user.type(screen.getByLabelText('Amount (g)'), '150')
    await user.type(screen.getByLabelText('Calories'), '280')
    await user.type(screen.getByLabelText('Protein (g)'), '52')
    await user.click(screen.getByText('Add'))

    expect(onAdd).toHaveBeenCalledWith({
      name: 'Chicken',
      amount: 150,
      calories: 280,
      protein: 52,
    })
  })

  it('scales calories/protein when amount changes after autocomplete select', async () => {
    const user = userEvent.setup()
    const suggestions = [
      {
        name: 'Chicken',
        calories: 280,
        protein: 52,
        amount: 150,
        caloriesPerGram: 280 / 150,
        proteinPerGram: 52 / 150,
      },
    ]
    render(FoodEntryForm, { props: { suggestions } })

    const nameInput = screen.getByLabelText('Food name')
    await user.click(nameInput)
    await user.click(screen.getByText('Chicken'))

    expect(screen.getByLabelText('Amount (g)')).toHaveValue(150)
    expect(screen.getByLabelText('Calories')).toHaveValue(280)
    expect(screen.getByLabelText('Protein (g)')).toHaveValue(52)

    const amountInput = screen.getByLabelText('Amount (g)')
    await user.clear(amountInput)
    await user.type(amountInput, '200')

    expect(screen.getByLabelText('Calories')).toHaveValue(373)
    expect(screen.getByLabelText('Protein (g)')).toHaveValue(69)
  })

  it('does not scale when catalog entry has no per-gram rates', async () => {
    const user = userEvent.setup()
    const suggestions = [
      {
        name: 'Coffee',
        calories: 5,
        protein: 0,
        amount: null,
        caloriesPerGram: null,
        proteinPerGram: null,
      },
    ]
    render(FoodEntryForm, { props: { suggestions } })

    const nameInput = screen.getByLabelText('Food name')
    await user.click(nameInput)
    await user.click(screen.getByText('Coffee'))

    expect(screen.getByLabelText('Amount (g)')).toHaveValue(null)
    expect(screen.getByLabelText('Calories')).toHaveValue(5)

    await user.type(screen.getByLabelText('Amount (g)'), '200')
    expect(screen.getByLabelText('Calories')).toHaveValue(5)
  })

  it('does not submit with empty name', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(FoodEntryForm, { props: { onAdd } })

    await user.type(screen.getByLabelText('Calories'), '100')
    await user.click(screen.getByText('Add'))

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('does not submit with no calories', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(FoodEntryForm, { props: { onAdd } })

    await user.type(screen.getByLabelText('Food name'), 'Chicken')
    await user.click(screen.getByText('Add'))

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('clears fields after successful submit', async () => {
    const user = userEvent.setup()
    render(FoodEntryForm, { props: { onAdd: () => {} } })

    await user.type(screen.getByLabelText('Food name'), 'Chicken')
    await user.type(screen.getByLabelText('Amount (g)'), '150')
    await user.type(screen.getByLabelText('Calories'), '280')
    await user.type(screen.getByLabelText('Protein (g)'), '52')
    await user.click(screen.getByText('Add'))

    expect(screen.getByLabelText('Food name')).toHaveValue('')
    expect(screen.getByLabelText('Amount (g)')).toHaveValue(null)
    expect(screen.getByLabelText('Calories')).toHaveValue(null)
    expect(screen.getByLabelText('Protein (g)')).toHaveValue(null)
  })

  it('reverts to catalog values when amount is cleared', async () => {
    const user = userEvent.setup()
    const suggestions = [
      {
        name: 'Chicken',
        calories: 280,
        protein: 52,
        amount: 150,
        caloriesPerGram: 280 / 150,
        proteinPerGram: 52 / 150,
      },
    ]
    render(FoodEntryForm, { props: { suggestions } })

    const nameInput = screen.getByLabelText('Food name')
    await user.click(nameInput)
    await user.click(screen.getByText('Chicken'))

    const amountInput = screen.getByLabelText('Amount (g)')
    await user.clear(amountInput)
    await user.type(amountInput, '200')
    expect(screen.getByLabelText('Calories')).toHaveValue(373)

    await user.clear(amountInput)
    expect(screen.getByLabelText('Calories')).toHaveValue(280)
    expect(screen.getByLabelText('Protein (g)')).toHaveValue(52)
  })
})
