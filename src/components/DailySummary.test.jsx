import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DailySummary } from './DailySummary'

describe('DailySummary', () => {
  it('renders calories and protein', () => {
    render(<DailySummary calories={500} protein={40} />)
    expect(screen.getByText('500')).toBeInTheDocument()
    expect(screen.getByText('40g')).toBeInTheDocument()
  })
})
