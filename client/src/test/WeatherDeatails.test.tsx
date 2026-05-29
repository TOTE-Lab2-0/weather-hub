import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WeatherDetails from '../components/details/WeatherDetails'

const mockWeatherData = {
  weather: {
    current: {
      relative_humidity_2m: 52,
      wind_speed_10m: 8.5,
    },
    daily: {
      sunrise: ['2026-05-23T05:24'],
      sunset: ['2026-05-23T20:28'],
      uv_index_max: [6.7]
    }
  }
}

describe('WeatherDetails', () => {

  it('shows spinner when isLoading is true', () => {
    render(<WeatherDetails weatherData={null} isLoading={true} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('shows spinner when weatherData is null', () => {
    render(<WeatherDetails weatherData={null} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders WEATHER DETAILS label', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('WEATHER DETAILS')).toBeInTheDocument()
  })

  it('renders humidity value', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('52%')).toBeInTheDocument()
  })

  it('renders wind speed value', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('8.5mph')).toBeInTheDocument()
  })

  it('renders UV index value', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText(/^7/)).toBeInTheDocument()
  })

  it('renders HUMIDITY label', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('HUMIDITY')).toBeInTheDocument()
  })

  it('renders WIND label', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('WIND')).toBeInTheDocument()
  })

  it('renders SUNRISE label', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('SUNRISE')).toBeInTheDocument()
  })

  it('renders SUNSET label', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('SUNSET')).toBeInTheDocument()
  })

  it('renders UV INDEX label', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('UV INDEX')).toBeInTheDocument()
  })

  it('does not show spinner when data is present', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).not.toBeInTheDocument()
  })

})