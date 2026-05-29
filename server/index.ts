import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import weatherRoutes from "./src/routes/weatherRoutes";
import authRoutes from "./src/routes/authRoutes";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectDB } from "./src/db/connection";
import locationRoutes from "./src/routes/locationRoutes";
import searchRoutes from './src/routes/searchRoutes'

//activates dotenv -> reads your .env file and loads values into process.env so code can access them
dotenv.config();

//creates the Express server
const app = express();
const PORT = process.env.PORT || 3001;

//adds headers to every response
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//lets Express read JSON from request bodies
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    // don't save the session again if noting changed:
    resave: false,
    // don't save the session if no data is there
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 1,
    },
  }),
);

app.use("/api/weather", weatherRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/locations", locationRoutes);

app.use("/api/search", searchRoutes)

// TDOD: Add global error handler middleware (must be after all routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error has occurred ❌." },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // create a console log
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//starts the server on a specific port
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });
export default app;
