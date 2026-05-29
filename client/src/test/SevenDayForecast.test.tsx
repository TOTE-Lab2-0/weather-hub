import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SevenDayForecast from '../components/shared/SevenDayForcast'

vi.mock('../../utils/getWeatherIcon', () => ({
  default: () => '01d'
}))

const mockWeatherData = {
  weather: {
    daily: {
      time: [
        '2026-05-23',
        '2026-05-24',
        '2026-05-25',
        '2026-05-26',
        '2026-05-27',
        '2026-05-28',
        '2026-05-29',
      ],
      temperature_2m_max: [71.9, 76.3, 76.5, 84.1, 75.1, 74.4, 69.6],
      temperature_2m_min: [52.5, 51.8, 55.7, 60.4, 55.2, 52.5, 46.9],
      weather_code: [51, 3, 51, 80, 3, 3, 1],
      precipitation_probability_max: [36, 12, 22, 7, 25, 6, 7],
    }
  }
}

describe('SevenDayForecast', () => {

  it('shows spinner when isLoading is true', () => {
    render(<SevenDayForecast weatherData={null} isLoading={true} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('shows spinner when weatherData is null', () => {
    render(<SevenDayForecast weatherData={null} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders 7-DAY FORECAST label', () => {
    render(<SevenDayForecast weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('7-DAY FORECAST')).toBeInTheDocument()
  })

  it('renders 7 weather icon images', () => {
    render(<SevenDayForecast weatherData={mockWeatherData} isLoading={false} />)
    const icons = screen.getAllByAltText('hourly weather icon')
    expect(icons).toHaveLength(7)
  })

  it('renders precipitation percentage for first day', () => {
    render(<SevenDayForecast weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('36%')).toBeInTheDocument()
  })

  it('renders high temp for first day', () => {
    render(<SevenDayForecast weatherData={mockWeatherData} isLoading={false} />)
    expect(screen.getByText('72°')).toBeInTheDocument()
  })

  it('renders low temp for first day', () => {
    render(<SevenDayForecast weatherData={mockWeatherData} isLoading={false} />)
    const temps = screen.getAllByText('53°')
    expect(temps.length).toBeGreaterThan(0)
  })

  it('does not show spinner when data is present', () => {
    render(<SevenDayForecast weatherData={mockWeatherData} isLoading={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).not.toBeInTheDocument()
  })

})