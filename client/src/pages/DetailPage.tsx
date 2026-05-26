import { Link } from 'react-router-dom'
import Hero from '../components/details/Hero.tsx'
import SaveButton from '../components/details/SaveButton.tsx'
import HourlyForecast from '../components/details/HourlyForecast.tsx'
// import SevenDayForecast from '../components/shared/SevenDayForcast.tsx'
import WeatherDetails from '../components/details/WeatherDetails.tsx'
import useWeather from '../hooks/useWeather.ts'

const DetailPage = ({ location }) => {
  const { weatherData, isLoading, error } = useWeather(location?.lat, location?.lng)

  return (
    <>
      {error ? <p>Weather detail page loading error.</p> 
      : 
        <div>
          <div>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Dashboard</Link>
          </div>
          <Hero weatherData={weatherData} isLoading={isLoading} />
          <SaveButton weatherData={weatherData} />
          <WeatherDetails weatherData={weatherData} isLoading={isLoading} />
          <HourlyForecast weatherData={weatherData} isLoading={isLoading} />
          {/* <SevenDayForecast weatherData={weatherData} isLoading={isLoading} /> */}
        </div>
      }
    </>
  )
}

export default DetailPage