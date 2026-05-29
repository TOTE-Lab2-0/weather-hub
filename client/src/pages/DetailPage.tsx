import { Link, useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Hero from '../components/details/Hero.tsx'
import SaveButton from '../components/details/SaveButton.tsx'
import HourlyForecast from '../components/details/HourlyForecast.tsx'
import SevenDayForecast from '../components/shared/SevenDayForcast.tsx'
import WeatherDetails from '../components/details/WeatherDetails.tsx'
import useWeather from '../hooks/useWeather.ts'

const DetailPage = ({ location }) => {
  const { id } = useParams() 
  const { state } = useLocation()
  const [ coords, setCoords ] = useState<{ lat: number; lng: number } | null>(null)
  
    useEffect(() => {
      if (id) {
        const locationFetch = async () => {
          try {
            const res = await fetch('/api/locations', {
              method: 'GET',
              credentials: 'include',
            })

            const data = await res.json()

            const savedLocation = data.saved_locations.find(location => location._id === id)

            setCoords({lat:savedLocation.lat, lng:savedLocation.lng})
          } catch(err) {
            throw new Error('Couldnt find saved location', err)
          }
        }
        locationFetch()
      } else {
        if (state?.lat && state?.lng) {
          setCoords({ lat: state.lat, lng: state.lng })
        } else if (location) {
          setCoords({lat: location.lat, lng: location.lng})
        }
      }
    }, [id, location])

    const { weatherData, isLoading, error } = useWeather(coords?.lat, coords?.lng)
  
  return (
    <>
      {error ? <p>Weather detail page loading error.</p> 
      : 
        <div className='min-h-screen bg-gradient-to-b from-[#0a1628] to-[#0d2b4e]'>
          <div className='max-w-sm mx-auto'>
            <div className='flex items-center justify-between pt-6 pb-2'>
              <Link className='text-white/80 text-sm flex items-center pl-4 hover:text-white' to='/'>‹ Home</Link>
              <Link className='text-white/80 text-sm flex items-center hover:text-white' to='/dashboard'>Dashboard ›</Link>
            </div>
            <Hero weatherData={weatherData} isLoading={isLoading} />
            <SaveButton weatherData={weatherData} location={coords}/>
            <WeatherDetails weatherData={weatherData} isLoading={isLoading} />
            <HourlyForecast weatherData={weatherData} isLoading={isLoading} variant={'dark'}/>
            <SevenDayForecast weatherData={weatherData} isLoading={isLoading} />
          </div>
        </div>
      }
    </>
  )
}

export default DetailPage