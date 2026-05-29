import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import WeatherCard from '../components/landing/WeatherCard'

// Mock getWeatherIcon so tests don't depend on its implementation
vi.mock('../../utils/getWeatherIcon', () => ({
  default: () => '01d'
}))

const mockWeatherData = {
  city: {
    locality: 'Port Edwards',
    principalSubdivision: 'Wisconsin'
  },
  weather: {
    current: {
      temperature_2m: 74.3,
      apparent_temperature: 70.1,
      weather_code: 1
    }
  }
}

describe('WeatherCard', () => {

  it('shows spinner when isLoading is true', () => {
    render(<WeatherCard weatherData={null} isLoading={true} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('shows spinner when weatherData is null', () => {
    render(<WeatherCard weatherData={null} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders city name and state when data is present', () => {
    render(<WeatherCard weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('Port Edwards, Wisconsin')).toBeInTheDocument()
  })

  it('renders current temperature rounded', () => {
    render(<WeatherCard weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('74°F')).toBeInTheDocument()
  })

  it('renders feels like temperature', () => {
    render(<WeatherCard weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('Feels like 70°F')).toBeInTheDocument()
  })

  it('renders weather icon image', () => {
    render(<WeatherCard weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByAltText('Weather condition graphic')).toBeInTheDocument()
  })

  it('does not show spinner when data is present', () => {
    render(<WeatherCard weatherData={mockWeatherData} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).not.toBeInTheDocument()
  })

})