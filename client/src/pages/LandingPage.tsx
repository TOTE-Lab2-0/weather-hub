import WeatherCard from '../components/landing/WeatherCard.tsx'
import HourlyForecast from '../components/details/HourlyForecast.tsx'

const LandingPage = ({weather}) => {
  return (
    <>
      <WeatherCard weather={weather} />
      <HourlyForecast weather={weather} />
    </>
  )
}

export default LandingPage