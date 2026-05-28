import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

//signUp function
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { name, email, password } = req.body;
};
