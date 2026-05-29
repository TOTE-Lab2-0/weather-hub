import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import NavBar from '../components/shared/NavBar'

// Helper to render NavBar inside a Router since it uses <Link>
const renderNavBar = (props) => {
  return render(
    <MemoryRouter>
      <NavBar {...props} />
    </MemoryRouter>
  )
}

describe('NavBar', () => {

  it('renders the WeatherHub logo text', () => {
    renderNavBar({ user: null, logout: vi.fn(), openModal: vi.fn() })
    expect(screen.getByText('Weather')).toBeInTheDocument()
    expect(screen.getByText('Hub')).toBeInTheDocument()
  })

  it('renders the logo icon image', () => {
    renderNavBar({ user: null, logout: vi.fn(), openModal: vi.fn() })
    expect(screen.getByAltText('icon')).toBeInTheDocument()
  })

  it('renders Log In and Sign Up buttons when user is null', () => {
    renderNavBar({ user: null, logout: vi.fn(), openModal: vi.fn() })
    expect(screen.getByText('Log In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('does not render Log In or Sign Up when user is logged in', () => {
    const user = { id: '1', name: 'Maia', email: 'maia@test.com' }
    renderNavBar({ user, logout: vi.fn(), openModal: vi.fn() })
    expect(screen.queryByText('Log In')).not.toBeInTheDocument()
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument()
  })

  it('renders Hi name greeting when user is logged in', () => {
    const user = { id: '1', name: 'Maia', email: 'maia@test.com' }
    renderNavBar({ user, logout: vi.fn(), openModal: vi.fn() })
    expect(screen.getByText('Hi, Maia!')).toBeInTheDocument()
  })

  it('renders Logout button when user is logged in', () => {
    const user = { id: '1', name: 'Maia', email: 'maia@test.com' }
    renderNavBar({ user, logout: vi.fn(), openModal: vi.fn() })
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('calls openModal with login when Log In is clicked', async () => {
    const openModal = vi.fn()
    renderNavBar({ user: null, logout: vi.fn(), openModal })
    await userEvent.click(screen.getByText('Log In'))
    expect(openModal).toHaveBeenCalledWith('login')
  })

  it('calls openModal with signup when Sign Up is clicked', async () => {
    const openModal = vi.fn()
    renderNavBar({ user: null, logout: vi.fn(), openModal })
    await userEvent.click(screen.getByText('Sign Up'))
    expect(openModal).toHaveBeenCalledWith('signup')
  })

  it('calls logout when Logout button is clicked', async () => {
    const logout = vi.fn()
    const user = { id: '1', name: 'Maia', email: 'maia@test.com' }
    renderNavBar({ user, logout, openModal: vi.fn() })
    await userEvent.click(screen.getByText('Logout'))
    expect(logout).toHaveBeenCalled()
  })

})