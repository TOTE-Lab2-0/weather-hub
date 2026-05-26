import getWeatherIcon from "../../utils/getWeatherIcon";

const WeatherCard = ({weatherData, isLoading }) => {

  return (
    <>
      {isLoading || !weatherData ? 
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#09b8d4]"></div>
       : 
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 mt-8  w-full border-t-4 border-t-[#09b8d4] text-center">
          <h2 className="text-xl font-bold mb-3 mt-3">{weatherData.city.locality}, {weatherData.city.principalSubdivision}</h2>
          <h1 className="text-4xl font-bold">
            {Math.round(weatherData.weather.current.temperature_2m)}°F
          </h1>
          <p className="text-gray-600">
            Feels like {Math.round(weatherData.weather.current.apparent_temperature)}°F
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${getWeatherIcon(weatherData.weather.current.weather_code)}@2x.png`}
            alt="Weather condition graphic"
            className="w-16 h-16 object-contain mx-auto"
            onError={(e) => {
              // If the image server fails, fallback to a standard emoji text display
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      }
    </>
  )
}

export default WeatherCard