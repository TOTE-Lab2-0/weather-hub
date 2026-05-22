import WeatherCard from '../components/weather/WeatherCard.tsx'
import HourlyForecast from '../components/weather/HourlyForecast.tsx'
import AuthModal from '../components/AuthModal.tsx'

const LandingPage = ({weather, showLogin, showSignUp, setShowLogin, setShowSignUp}) => {
  return (
    <>
      <WeatherCard weather={weather} />
      <HourlyForecast weather={weather} />
      <AuthModal showLogin={showLogin} showSignUp={showSignUp} setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
    </>
  )
}

export default LandingPage