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
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=7&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather from Open-Meteo" });
    return next(error);
  }
};
