import WeatherCard from '../components/landing/WeatherCard.tsx'
import SevenDayForecast from '../components/shared/SevenDayForcast.tsx'
import NavBar from '../components/shared/NavBar.tsx'
import CTACard from '../components/landing/CTACard.tsx'
import DashboardLinkCard from '../components/landing/DashboardLinkCard.tsx'

import useWeather from '../hooks/useWeather.ts'

const LandingPage = ({ location, logout, openModal, user }) => {
  const { weatherData, isLoading, error } = useWeather(location?.lat, location?.lng)

  return (
    <>
      {error ? <p>Something went wrong loading weather data.</p> : 
        <>
          <NavBar logout={logout} openModal={openModal} user={user} />
          <p>Live Conditions</p>
          <h1>Your weather, right now.</h1>
          <WeatherCard weatherData={weatherData} isLoading={isLoading}/>
          {/* <SevenDayForecast weatherData={weatherData} isLoading={isLoading}/> */}
          {!user ? 
            <CTACard openModal={openModal} />
          :
            <DashboardLinkCard user={user}/>
          }
        </>
      }
    </>
  )
}

export default LandingPage