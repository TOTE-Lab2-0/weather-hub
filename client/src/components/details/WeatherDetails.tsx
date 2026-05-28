
const WeatherDetails = ({ weatherData, isLoading }) => {
  
  return (
    <>
      <div className='w-full text-white pt-10'>
        {isLoading || !weatherData ? 
          <div className='flex items-center justify-center h-32'>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#09b8d4]"></div>
          </div>
        :
          <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white'>
            <p className='text-xs font-semibold tracking-widest text-white/60 mb-4'>WEATHER DETAILS</p>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex items-center gap-3'>
                <span className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg'>💧</span>
                <div>
                  <p className='text-xs text-white/60'>HUMIDITY</p>
                  <p className='font-bold'>{weatherData.weather.current.relative_humidity_2m}%</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                  <span className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg'> 💨</span>
                  <div>
                    <p className='text-xs text-white/60'>WIND</p>
                    <p className='font-bold'>{weatherData.weather.current.wind_speed_10m}mph</p>
                  </div>
              </div>
              <div className='flex items-center gap-3'>
                <span className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg'>🌅</span>
                <div>
                  <p className='text-xs text-white/60'>SUNRISE</p>
                  <p className='font-bold'>{new Date(weatherData.weather.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <span className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg'>🌇</span>
                <div>
                  <p className='text-xs text-white/60'>SUNSET</p>
                  <p className='font-bold'>{new Date(weatherData.weather.daily.sunset[0]).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <span className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg'>☀️</span>
                <div>
                  <p className='text-xs text-white/60'>UV INDEX</p>
                  <p className='font-bold'>{Math.round(weatherData.weather.daily.uv_index_max[0])} <span className='text-white/60 font-normal text-sm'>High</span></p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default WeatherDetails