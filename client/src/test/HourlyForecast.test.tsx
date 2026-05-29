import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import HourlyForecast from '../components/details/HourlyForecast'

vi.mock('../../utils/getWeatherIcon', () => ({
  default: () => '01d'
}))

// Generate future hourly times so filter doesn't remove them
const generateFutureTimes = () => {
  const times = []
  const now = new Date()
  now.setMinutes(0, 0, 0)
  for (let i = 0; i < 24; i++) {
    const future = new Date(now.getTime() + i * 60 * 60 * 1000)
    times.push(future.toISOString().slice(0, 16))
  }
  return times
}

const mockWeatherData = {
  weather: {
    hourly: {
      time: generateFutureTimes(),
      temperature_2m: Array(168).fill(72.5),
      weather_code: Array(168).fill(1),
      precipitation_probability: Array(168).fill(10),
    }
  }
}

describe('HourlyForecast', () => {

  it('shows spinner when isLoading is true', () => {
    render(<HourlyForecast weatherData={null} isLoading={true} variant='dark' />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders Hourly Forecast title', () => {
    render(<HourlyForecast weatherData={mockWeatherData} isLoading={false} variant='dark' />)
    expect(screen.getByText('Hourly Forecast')).toBeInTheDocument()
  })

  it('renders weather icon images', () => {
    render(<HourlyForecast weatherData={mockWeatherData} isLoading={false} variant='dark' />)
    const icons = screen.getAllByAltText('hourly weather icon')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders temperature values', () => {
    render(<HourlyForecast weatherData={mockWeatherData} isLoading={false} variant='dark' />)
    const temps = screen.getAllByText('73°F')
    expect(temps.length).toBeGreaterThan(0)
  })

  it('renders precipitation values', () => {
    render(<HourlyForecast weatherData={mockWeatherData} isLoading={false} variant='dark' />)
    const rain = screen.getAllByText(/Rain 10%/)
    expect(rain.length).toBeGreaterThan(0)
  })

  it('does not render CTA when openModal is not passed', () => {
    render(<HourlyForecast weatherData={mockWeatherData} isLoading={false} variant='dark' />)
    expect(screen.queryByText('View 7-Day Forecast')).not.toBeInTheDocument()
  })

  it('renders CTA when openModal is passed', () => {
    render(<HourlyForecast weatherData={mockWeatherData} isLoading={false} variant='light' openModal={vi.fn()} />)
    expect(screen.getByText('View 7-Day Forecast')).toBeInTheDocument()
  })

  it('calls openModal with signup when CTA button is clicked', async () => {
    const openModal = vi.fn()
    render(<HourlyForecast weatherData={mockWeatherData} isLoading={false} variant='light' openModal={openModal} />)
    await userEvent.click(screen.getByText('View 7-Day Forecast'))
    expect(openModal).toHaveBeenCalledWith('signup')
  })

})