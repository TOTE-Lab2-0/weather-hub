import WeatherCard from '../components/landing/WeatherCard.tsx'
import HourlyForecast from '../components/details/HourlyForecast.tsx'

const LandingPage = ({weatherData}) => {
  return (
    <>
      <WeatherCard weather={weatherData} />
      <HourlyForecast weather={weatherData} />
    </>
  )
}

export default LandingPage