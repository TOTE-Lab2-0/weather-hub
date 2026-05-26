import WeatherCard from '../components/landing/WeatherCard.tsx'
import HourlyForecast from '../components/details/HourlyForecast.tsx'
import NavBar from '../components/shared/NavBar.tsx'
import useWeather from '../hooks/useWeather.ts'

const LandingPage = ({ location, logout, openModal, user }) => {
  const { weatherData, isLoading, error } = useWeather(location?.lat, location?.lng)

  return (
    <>
      <NavBar logout={logout} openModal={openModal} user={user}/>
      <WeatherCard weather={weatherData} />
      <HourlyForecast weather={weatherData} />
    </>
  )
}

export default LandingPage