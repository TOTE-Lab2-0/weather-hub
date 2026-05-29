import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingScreen from '../components/shared/LoadingScreen'

describe('LoadingScreen', () => {

  it('renders the Verifying text', () => {
    render(<LoadingScreen />)
    expect(screen.getByText('Verifying')).toBeInTheDocument()
  })

  it('renders the logo icon', () => {
    render(<LoadingScreen />)
    expect(screen.getByAltText('icon')).toBeInTheDocument()
  })

  it('renders three animated dots', () => {
    render(<LoadingScreen />)
    const dots = document.querySelectorAll('.animate-bounce')
    expect(dots.length).toBe(3)
  })

})