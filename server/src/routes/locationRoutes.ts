import express from "express";
import {
  getAllLocations,
  addLocation,
  deleteLocation,
} from "../controller/locationController";
import { isAuthenticated } from "../controller/authController";

/* - [ ] Create location routes under `/api/locations`
- [ ] Protect all location routes with session auth
- [ ] Implement `GET /api/locations`
- [ ] Implement `POST /api/locations`
- [ ] Implement `DELETE /api/locations/:id`
- [ ] Filter all location queries by `userId`
- [ ] Exclude `userId` from frontend responses unless the team explicitly needs it
*/

const router = express.Router();

router.get("/", isAuthenticated, getAllLocations);
router.post("/", isAuthenticated, addLocation);
router.delete("/:id", isAuthenticated, deleteLocation);

export default router;
