import express from "express";
import {
  signUp,
  logIn,
  logOut,
  verifyAuth,
} from "../controller/authController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/verify", verifyAuth);

export default router;
