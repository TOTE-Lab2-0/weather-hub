import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SaveButton from '../components/details/SaveButton'

const mockWeatherData = {
  city: {
    locality: 'Port Edwards',
    principalSubdivision: 'Wisconsin'
  }
}

const mockLocation = {
  lat: 44.36,
  lng: -89.84
}

describe('SaveButton', () => {

  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  it('renders Save this location button initially', () => {
    render(<SaveButton weatherData={mockWeatherData} location={mockLocation} />)
    expect(screen.getByText(/Save this location/i)).toBeInTheDocument()
  })

  it('does not show saved state initially', () => {
    render(<SaveButton weatherData={mockWeatherData} location={mockLocation} />)
    expect(screen.queryByText(/Location saved/i)).not.toBeInTheDocument()
  })

  it('shows Location saved after successful save', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true })
    render(<SaveButton weatherData={mockWeatherData} location={mockLocation} />)
    await userEvent.click(screen.getByText(/Save this location/i))
    expect(screen.getByText(/Location saved/i)).toBeInTheDocument()
  })

  it('does not show saved state if fetch fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false })
    render(<SaveButton weatherData={mockWeatherData} location={mockLocation} />)
    await userEvent.click(screen.getByText(/Save this location/i))
    expect(screen.queryByText(/Location saved/i)).not.toBeInTheDocument()
  })

  it('renders filled star when saved', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true })
    render(<SaveButton weatherData={mockWeatherData} location={mockLocation} />)
    await userEvent.click(screen.getByText(/Save this location/i))
    expect(screen.getByText('★')).toBeInTheDocument()
  })

})