import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { Given, When, Then, And, feature } from '../gherkin'

let user

Given('I open the app', async () => {
  cleanup()
  user = userEvent.setup()
  render(<App />)
})

When(/^I add "(.+)" with (\d+) calories and (\d+)g protein$/, async (name, cal, protein) => {
  await user.type(screen.getByLabelText('Food name'), name)
  await user.type(screen.getByLabelText('Calories'), cal)
  await user.type(screen.getByLabelText('Protein (g)'), protein)
  await user.click(screen.getByText('Add'))
})

When(/^I add "(.+)" at (\d+)g with (\d+) calories and (\d+)g protein$/, async (name, amount, cal, protein) => {
  await user.type(screen.getByLabelText('Food name'), name)
  await user.type(screen.getByLabelText('Amount (g)'), amount)
  await user.type(screen.getByLabelText('Calories'), cal)
  await user.type(screen.getByLabelText('Protein (g)'), protein)
  await user.click(screen.getByText('Add'))
})

When(/^I delete "(.+)"$/, async (name) => {
  await user.click(screen.getByLabelText(`Delete ${name}`))
})

When(/^I start typing "(.+)" in the food name$/, async (text) => {
  await user.type(screen.getByLabelText('Food name'), text)
})

When(/^I select "(.+)" from autocomplete$/, async (name) => {
  const option = screen.getByRole('option', { name: new RegExp(name) })
  await user.click(option)
})

When(/^I change the amount to (\d+)g$/, async (amount) => {
  const input = screen.getByLabelText('Amount (g)')
  await user.clear(input)
  await user.type(input, amount)
})

Then(/^I should see "(.+)" in the entry list$/, async (name) => {
  const { expect } = await import('vitest')
  expect(screen.getByLabelText(`Delete ${name}`)).toBeInTheDocument()
})

Then(/^I should not see "(.+)" in the entry list$/, async (name) => {
  const { expect } = await import('vitest')
  expect(screen.queryByLabelText(`Delete ${name}`)).not.toBeInTheDocument()
})

Then(/^the daily total should show (\d+) calories and (\d+)g protein$/, async (cal, protein) => {
  const { expect } = await import('vitest')
  expect(screen.getByText(cal)).toBeInTheDocument()
  expect(screen.getByText(`${protein}g`)).toBeInTheDocument()
})

Then(/^the calories field should show (\d+)$/, async (value) => {
  const { expect } = await import('vitest')
  expect(screen.getByLabelText('Calories')).toHaveValue(Number(value))
})

Then(/^the protein field should show (\d+)$/, async (value) => {
  const { expect } = await import('vitest')
  expect(screen.getByLabelText('Protein (g)')).toHaveValue(Number(value))
})

// Run the feature file
import path from 'node:path'
feature(path.resolve(__dirname, '../features/food-entry.feature'))
