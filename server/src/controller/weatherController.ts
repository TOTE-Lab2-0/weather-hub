import type { Request, Response, NextFunction } from "express";

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const lat = (req.query.lat as string) || "-2.3333";
  const lng = (req.query.lng as string) || "34.8333";

  try {
    // CRITICAL: Make sure the URL includes BOTH &current=... AND &hourly=...

    //const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&forecast_days=1`;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&hourly=temperature_2m,weather_code,relative_humidity_2m,precipitation,apparent_temperature,wind_speed_10m,precipitation_probability,rain,dew_point_2m&current=temperature_2m,precipitation,weather_code,wind_speed_10m,relative_humidity_2m,rain,cloud_cover,wind_direction_10m,apparent_temperature,is_day,showers,snowfall,pressure_msl,surface_pressure,wind_gusts_10m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
    const response = await fetch(url);
    const weatherData = await response.json();

    //res.json(weatherData);
    res.locals.weather = weatherData;
    return next()
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather from Open-Meteo" });
    return next(error);
  }
};
