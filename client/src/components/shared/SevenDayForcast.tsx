import getWeatherIcon from "../../utils/getWeatherIcon"

const SevenDayForecast = ({ weatherData, isLoading }) => {
  return (
    <>
      <div className='w-full text-white pt-1 pb-10'>
        {isLoading || !weatherData ?
          <div className='flex items-center justify-center h-32'>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#09b8d4]"></div>
          </div>
        :
          <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white'>
            <h2 className='text-xs font-semibold tracking-widest text-white/60 mb-4'>7-DAY FORECAST</h2>
            <div>
              {weatherData.weather.daily.time.map((timeString: string, index:number) => ({
                timeString, 
                index
              }))
              .map(({timeString, index}) => {
                const min = weatherData.weather.daily.temperature_2m_min[index]
                const max = weatherData.weather.daily.temperature_2m_max[index]
                const overallMin = Math.min(...weatherData.weather.daily.temperature_2m_min)
                const overallMax = Math.max(...weatherData.weather.daily.temperature_2m_max)

                const leftOffset = ((min - overallMin) / (overallMax - overallMin)) * 100
                const barWidth = ((max - min) / (overallMax - overallMin)) * 100

                return(
                  <div className='flex items-center justify-between py-2 border-b border-white/10' key={timeString}>
                    <p className='w-10 text-sm font-semibold'>{new Date(timeString + 'T12:00:00').toLocaleDateString('en-US', {weekday: 'short'})}</p>
                    <img 
                      className='w-8 h-8' 
                      src={`https://openweathermap.org/img/wn/${getWeatherIcon(weatherData.weather.daily.weather_code[index])}.png`}
                      alt="hourly weather icon" 
                    />
                    <p className='text-xs text-[#09b8d4] w-8'>{weatherData.weather.daily.precipitation_probability_max[index]}%</p>
                    <p className='text-xs text-white/60 w-8'>{Math.round(min)}°</p>
                    <div className='relative h-1 bg-white/20 rounded-full w-24'>
                      <div className='absolute h-1 bg-[#09b8d4] rounded-full' style={{ left: `${leftOffset}%`, width: `${barWidth}%`}} />
                    </div>
                    <p className='text-xs w-8 text-right'>{Math.round(max)}°</p>
                  </div>
                )
              })
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default SevenDayForecast