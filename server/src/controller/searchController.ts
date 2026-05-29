import type { Request, Response, NextFunction } from "express";

export const citySearch = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
    const city = (req.query.city as string);

    try{
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        
        const response = await fetch (url);
        
        const data = await response.json() as { results: { name: string; latitude: number; longitude: number }[] }
        const results = data.results

        if (!results || results.length === 0) {
          res.status(404).json({ error: 'City not found' })
          return
        }

        res.json({
            locationName:results[0].name,
            lat: results[0].latitude,
            lng: results[0].longitude
        })
    } catch (error) {
        res.status(500).json({ error: "Error in citySearch" });
        return next(error)
    }
}


