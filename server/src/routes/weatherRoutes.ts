import express from "express";
import {getWeather} from "../controller/weatherController";

const router = express.Router();

router.get("/", getWeather);

export default router;