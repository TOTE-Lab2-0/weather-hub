import WeatherCard from '../components/landing/WeatherCard.tsx'
import HourlyForecast from '../components/details/HourlyForecast.tsx'
import NavBar from '../components/shared/NavBar.tsx'

const LandingPage = ({ location, logOut, openModal, user }) => {
  return (
    <>
      <NavBar logOut={logOut} openModal={openModal} user={user}/>
      <WeatherCard weather={weatherData} />
      <HourlyForecast weather={weatherData} />
    </>
  )
}

export default LandingPage