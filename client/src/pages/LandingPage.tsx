import WeatherCard from '../components/weather/WeatherCard.tsx'
import HourlyForecast from '../components/weather/HourlyForecast.tsx'

const LandingPage = ({weather}) => {
  return (
    <>
      <WeatherCard weather={weather} />
      <HourlyForecast weather={weather} />
    </>
  )
}

export default LandingPage