import { useState, useEffect } from 'react'

const useWeather = (lat, lng) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ weatherData, setWeatherData ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect( () => {
    if (!lat || !lng) return

    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}`)
        const data = await res.json()

        setWeatherData(data)
      } catch(err) {
        setError(err)
        return error
      } finally {
        setIsLoading(false)
      }
    }
    fetchWeather()
  }, [lat, lng])
  return { weatherData, isLoading, error}
}

export default useWeather
