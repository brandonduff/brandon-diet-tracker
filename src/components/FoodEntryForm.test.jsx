import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FoodEntryForm } from './FoodEntryForm'

describe('FoodEntryForm', () => {
  it('renders input fields and submit button', () => {
    render(<FoodEntryForm />)
    expect(screen.getByLabelText('Food name')).toBeInTheDocument()
    expect(screen.getByLabelText('Calories')).toBeInTheDocument()
    expect(screen.getByLabelText('Protein (g)')).toBeInTheDocument()
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  it('calls onAdd with entry data on submit', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<FoodEntryForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText('Food name'), 'Chicken')
    await user.type(screen.getByLabelText('Calories'), '280')
    await user.type(screen.getByLabelText('Protein (g)'), '52')
    await user.click(screen.getByText('Add'))

    expect(onAdd).toHaveBeenCalledWith({
      name: 'Chicken',
      calories: 280,
      protein: 52,
    })
  })
})
