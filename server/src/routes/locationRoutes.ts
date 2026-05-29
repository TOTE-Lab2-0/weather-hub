import express from "express";
import {
  getAllLocations,
  addLocation,
  deleteLocation,
} from "../controller/locationController";

/* - [ ] Create location routes under `/api/locations`
- [ ] Protect all location routes with session auth
- [ ] Implement `GET /api/locations`
- [ ] Implement `POST /api/locations`
- [ ] Implement `DELETE /api/locations/:id`
- [ ] Filter all location queries by `userId`
- [ ] Exclude `userId` from frontend responses unless the team explicitly needs it
*/

const router = express.Router();

router.get("/", getAllLocations);
router.post("/", addLocation);
router.delete("/", deleteLocation);
