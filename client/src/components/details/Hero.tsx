const Hero = ({ weatherData, isLoading }) => {
  return (
    <>
      <div className='w-full text-center text-white pt-12'>
        {isLoading || !weatherData ? 
          <div className='flex items-center justify-center h-32'>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#09b8d4]"></div>
          </div>
        :
          <div>
            <p className='text-xs font-semibold tracking-widest text-white/60 mb-1'>LOCATION</p>
            <h2 className='text-4xl font-thin mb-1'>{weatherData.city.locality}</h2>
            <p className='text-base text-white/60 mb-8'>{weatherData.city.principalSubdivision}</p>
            <h1 className='text-8xl mb-2'>{Math.round(weatherData.weather.current.temperature_2m)}°</h1>
            <p className='text-sm text-white/60 mb-2' >Feels Like: {Math.round(weatherData.weather.current.apparent_temperature)}°</p>
            <p className='text-sm text-white/60 mb-8'>H: <span className='text-white'>{Math.round(weatherData.weather.daily.temperature_2m_max[0])}°</span> | L: <span className='text-white'>{weatherData.weather.daily.temperature_2m_min[0]}°</span></p>
          </div>
        }
      </div>
    </>
  )
}

export default Hero