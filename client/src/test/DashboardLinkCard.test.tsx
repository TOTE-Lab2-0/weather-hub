import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import DashboardLinkCard from '../components/landing/DashboardLinkCard'

const renderDashboardLinkCard = (props) => {
  return render(
    <MemoryRouter>
      <DashboardLinkCard {...props} />
    </MemoryRouter>
  )
}

describe('DashboardLinkCard', () => {

  it('renders welcome message with user name', () => {
    renderDashboardLinkCard({ user: { id: '1', name: 'Maia', email: 'maia@test.com' } })
    expect(screen.getByText('Welcome back Maia!')).toBeInTheDocument()
  })

  it('renders the saved locations description', () => {
    renderDashboardLinkCard({ user: { id: '1', name: 'Maia', email: 'maia@test.com' } })
    expect(screen.getByText('View your saved locations')).toBeInTheDocument()
  })

  it('renders the Go to Dashboard link', () => {
    renderDashboardLinkCard({ user: { id: '1', name: 'Maia', email: 'maia@test.com' } })
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument()
  })

  it('renders the user emoji icon', () => {
    renderDashboardLinkCard({ user: { id: '1', name: 'Maia', email: 'maia@test.com' } })
    expect(screen.getByText('👤')).toBeInTheDocument()
  })

  it('renders correct name for different users', () => {
    renderDashboardLinkCard({ user: { id: '2', name: 'Kanami', email: 'kanami@test.com' } })
    expect(screen.getByText('Welcome back Kanami!')).toBeInTheDocument()
  })

})