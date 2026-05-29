import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import CTACard from '../components/landing/CTACard'

describe('CTACard', () => {

  it('renders the heading text', () => {
    render(<CTACard openModal={vi.fn()} />)
    expect(screen.getByText('Save your favorite locations')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<CTACard openModal={vi.fn()} />)
    expect(screen.getByText(/Create a free account/i)).toBeInTheDocument()
  })

  it('renders the Sign Up button', () => {
    render(<CTACard openModal={vi.fn()} />)
    expect(screen.getByText("Sign Up - It's Free")).toBeInTheDocument()
  })

  it('renders the Log In button', () => {
    render(<CTACard openModal={vi.fn()} />)
    expect(screen.getByText('Log In')).toBeInTheDocument()
  })

  it('calls openModal with signup when Sign Up is clicked', async () => {
    const openModal = vi.fn()
    render(<CTACard openModal={openModal} />)
    await userEvent.click(screen.getByText("Sign Up - It's Free"))
    expect(openModal).toHaveBeenCalledWith('signup')
  })

  it('calls openModal with login when Log In is clicked', async () => {
    const openModal = vi.fn()
    render(<CTACard openModal={openModal} />)
    await userEvent.click(screen.getByText('Log In'))
    expect(openModal).toHaveBeenCalledWith('login')
  })

  it('renders the location pin emoji', () => {
    render(<CTACard openModal={vi.fn()} />)
    expect(screen.getByText('📍')).toBeInTheDocument()
  })

})