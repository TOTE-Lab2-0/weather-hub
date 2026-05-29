import express from "express";
import {
  signUp,
  logIn,
  logOut,
  isAuthenticated,
  verifyAuth,
} from "../controller/authController";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/verify", isAuthenticated, verifyAuth);

export default router;
