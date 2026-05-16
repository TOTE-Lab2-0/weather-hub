import type { Request, Response, NextFunction } from "express";

export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Location of Serengeti National Park, Tanzania
  const lat = (req.query.lat as string) || "-2.3333";
  const lng = (req.query.lng as string) || "34.8333";
  //res.status(400).json({ error: "Location identifier is mandatory." });

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lng}` +
      `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,apparent_temperature` +
      `&temperature_unit=fahrenheit` +
      `&timezone=auto`;

    //send a request from server to the Open-Meteo API
    // response here is a JSON object
    const response = await fetch(url);

    //extract the JSON body from the response; this return JS object
    const data = await response.json();

    //res.json(data) sends JSON to frontend.
    // But the frontend can convert it back into a JS object using response.json().
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
    return next(error);
  }
};
