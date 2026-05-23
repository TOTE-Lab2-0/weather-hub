{/* ── CURRENT WEATHER ── */}
import LoadingScreen from "../shared/LoadingScreen";
import getWeatherIcon from "../../utils/getWeatherIcon";

const WeatherCard = ({weather}) => {

  return (
    <>
      {weather && weather.current ? (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 mt-8  w-128">
          <h2 className="text-xl font-bold mb-3 mt-3">
            Current Location:
            <p className="text-sm font-bold mb-1 mt-1 flex gap-4">
              <span>Lat: {weather.latitude.toFixed(2)}</span>
              <span>Lon: {weather.longitude.toFixed(2)}</span>
            </p>
          </h2>

          <h1 className="text-4xl font-bold">
            {Math.round(weather.current.temperature_2m)}°C
          </h1>
          <p className="text-gray-600">
            Feels like {Math.round(weather.current.apparent_temperature)}°C
          </p>
          <p className="text-sm text-gray-400">
            Humidity: {weather.current.relative_humidity_2m}% | Wind:{" "}
            {weather.current.wind_speed_10m} km/h
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${getWeatherIcon(weather.current.weather_code)}@2x.png`}
            alt="Weather condition graphic"
            className="w-16 h-16 object-contain"
            onError={(e) => {
              // If the image server fails, fallback to a standard emoji text display
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  )
}

export default WeatherCard