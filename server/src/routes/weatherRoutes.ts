import express from "express";
import {getWeather} from "../controller/weatherController";
import { getCity } from "../controller/cityController";

const router = express.Router();

router.get("/",getWeather, getCity);

export default router;