import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
//import { User } from "../models/User";

//declare module

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

//signUp function. only has one return so don't need to specify as Promise<void>
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  //verification
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    //lowercase the email address
    const normalizedEmail = email.toLowerCase();

    // //check already exist email
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // harsh password
    const passwordHash = await bcrypt.hash(password, 10);

    // save user
    const user = new User({ name, email: normalizedEmail, passwordHash });
    await user.save();

    //save the user data to session
    req.session.userId = user._id.toString();

    //return user data
    return res
      .status(201)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    return next(err);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: e });
  }
};

//logOut should be async
export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // req.seesion.destory() deletes the current user's session data from the server
  req.session.destroy((err: Error | null) => {
    if (err) {
      return res.status(500).json({ message: "logout failed " });
    }
    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  });
};

export const verifyAuth = async () => {};
