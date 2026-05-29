import express from "express";
import { citySearch } from "../controller/searchController";

const router = express.Router();

router.get("/", citySearch);

export default router;
