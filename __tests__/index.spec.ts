/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Dashboard from '@pages/dashboard'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Dashboard />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})