import type { Request, Response, NextFunction } from "express";

// convert [lat, lon] to city name
export const getCity = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
    const lat = (req.query.lat as string) || "-2.3333";
    const lng = (req.query.lng as string) || "34.8333";
    try{
        // process.env: Read the environment variable named [BIGDATACLOUD_API_KEY] from Node.js
        const url = `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${process.env.BIGDATACLOUD_API_KEY}`
        
        //fetch response from the API using this url. 
        const response = await fetch (url);
        
        //parse the response into JS object data
        const cityName = await response.json()

        //make the data (JS) to response (json string)
        //res.json(data)
        res.json({
            weather:res.locals.weather,
            city:cityName
        })

        
        
    } catch (error) {
        res.status(500).json({ error: "Error in getCity" });
        return next(error)
    }
}


