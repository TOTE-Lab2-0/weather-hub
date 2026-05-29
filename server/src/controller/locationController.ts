import { Request, Response, NextFunction } from "express";
import { SavedLocation } from "../models/SavedLocation";

export const getAllLocations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const savedLocations = await SavedLocation.find({
      userId: req.session.userId,
    }).select("_id locationName lat lng saved_at");

    return res.status(200).json({ saved_locations: savedLocations });
  } catch (err) {
    return next(err);
  }
};

export const addLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { locationName, lat, lng } = req.body;

  if (!locationName || lat === undefined || lng === undefined) {
    return res
      .status(400)
      .json({ error: "locationName, lat, and lng are required" });
  }

  try {
    const existing = await SavedLocation.findOne({ userId: req.session.userId, locationName })
    if (existing) return res.status(409).json({ error: 'Location already saved' })

    const savedLocation = await SavedLocation.create({
      userId: req.session.userId,
      locationName,
      lat,
      lng,
    });

    return res.status(201).json({
      saved_location: {
        _id: savedLocation._id,
        locationName: savedLocation.locationName,
        lat: savedLocation.lat,
        lng: savedLocation.lng,
        saved_at: savedLocation.savedAt,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleteLocation = await SavedLocation.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!deleteLocation) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    return res.status(200).json({
      message: "Location deleted",
    });
  } catch (err) {
    return next(err);
  }
};
