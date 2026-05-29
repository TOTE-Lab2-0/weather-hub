import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '../components/details/Hero'

const mockWeatherData = {
  city: {
    locality: 'Port Edwards',
    principalSubdivision: 'Wisconsin'
  },
  weather: {
    current: {
      temperature_2m: 74.3,
      apparent_temperature: 70.1,
    },
    daily: {
      temperature_2m_max: [89.4, 77.0, 79.1],
      temperature_2m_min: [52.5, 51.8, 57.8],
    }
  }
}

describe('Hero', () => {

  it('shows spinner when isLoading is true', () => {
    render(<Hero weatherData={null} isLoading={true} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('shows spinner when weatherData is null', () => {
    render(<Hero weatherData={null} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders city name when data is present', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('Port Edwards')).toBeInTheDocument()
  })

  it('renders state when data is present', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('Wisconsin')).toBeInTheDocument()
  })

  it('renders current temperature rounded', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('74°')).toBeInTheDocument()
  })

  it('renders feels like temperature', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText(/Feels Like: 70°/i)).toBeInTheDocument()
  })

  it('renders today high temperature', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('89°')).toBeInTheDocument()
  })

  it('renders today low temperature', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('53°')).toBeInTheDocument()
  })

  it('renders LOCATION label', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('LOCATION')).toBeInTheDocument()
  })

  it('does not show spinner when data is present', () => {
    render(<Hero weatherData={mockWeatherData} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).not.toBeInTheDocument()
  })

})