import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AuthModal from '../components/shared/AuthModal'

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onAuthSuccess: vi.fn(),
  initialMode: 'login' as const,
}

describe('AuthModal', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    globalThis.fetch = vi.fn()
  })

  it('does not render when isOpen is false', () => {
    render(<AuthModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(<AuthModal {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders login form when initialMode is login', () => {
    render(<AuthModal {...defaultProps} initialMode='login' />)
    expect(screen.getByRole('heading', { name: 'Log In' })).toBeInTheDocument()
    expect(screen.getByText('WELCOME BACK')).toBeInTheDocument()
  })

  it('renders signup form when initialMode is signup', () => {
    render(<AuthModal {...defaultProps} initialMode='signup' />)
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument()
    expect(screen.getByText('GET STARTED')).toBeInTheDocument()
  })

  it('renders Cancel button', () => {
    render(<AuthModal {...defaultProps} />)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls onClose when Cancel is clicked', async () => {
    const onClose = vi.fn()
    render(<AuthModal {...defaultProps} onClose={onClose} />)
    await userEvent.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalled()
  })

  it('switches to signup form when Need an account is clicked', async () => {
    render(<AuthModal {...defaultProps} initialMode='login' />)
    await userEvent.click(screen.getByText('Need an account?'))
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument()
  })

  it('switches to login form when Already have an account is clicked', async () => {
    render(<AuthModal {...defaultProps} initialMode='signup' />)
    await userEvent.click(screen.getByText('Already have an account?'))
    expect(screen.getByRole('heading', { name: 'Log In' })).toBeInTheDocument()
  })

  it('shows error message when login fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' })
    })
    render(<AuthModal {...defaultProps} initialMode='login' />)
    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com')
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpassword')
    await userEvent.click(screen.getByRole('button', { name: 'Log In' }))
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument()
  })

  it('calls onAuthSuccess when login succeeds', async () => {
    const mockUser = { id: '1', name: 'Maia', email: 'maia@test.com' }
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUser
    })
    const onAuthSuccess = vi.fn()
    render(<AuthModal {...defaultProps} onAuthSuccess={onAuthSuccess} />)
    await userEvent.type(screen.getByLabelText('Email'), 'maia@test.com')
    await userEvent.type(screen.getByLabelText('Password'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: 'Log In' }))
    expect(onAuthSuccess).toHaveBeenCalledWith(mockUser)
  })

})