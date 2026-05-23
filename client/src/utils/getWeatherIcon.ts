const getWeatherIcon = (code: number) => {
  // Maps Open-Meteo WMO codes to OpenWeather Map icon codes
  if (code === 0) return "01d"; // Sunny
  if (code >= 1 && code <= 3) return "02d"; // Partly Cloudy
  if (code === 45 || code === 48) return "50d"; // Foggy
  if (code >= 51 && code <= 67) return "10d"; // Rain
  if (code >= 71 && code <= 77) return "13d"; // Snow
  if (code >= 80 && code <= 82) return "09d"; // Rain Showers
  if (code >= 95 && code <= 99) return "11d"; // Thunderstorm
  return "03d"; // Default cloudy
};

export default getWeatherIcon