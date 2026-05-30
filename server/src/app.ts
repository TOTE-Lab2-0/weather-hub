// server/src/app.ts

import express from "express";
import cors from "cors";
import session, { type SessionOptions } from "express-session";
import MongoStore from "connect-mongo";
import type { Request, Response, NextFunction } from "express";

import weatherRoutes from "./routes/weatherRoutes";
import authRoutes from "./routes/authRoutes";
import locationRoutes from "./routes/locationRoutes";
import searchRoutes from "./routes/searchRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET || "test-session-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 1,
  },
};

if (process.env.NODE_ENV !== "test") {
  sessionOptions.store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
  });
}

app.use(session(sessionOptions));


app.use("/api/weather", weatherRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/search", searchRoutes);

// Global error handler must stay after all routes
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error has occurred ❌." },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

export default app;
