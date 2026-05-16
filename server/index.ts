import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import weatherRoutes from "./src/routes/weatherRoutes";
import { error } from "node:console";

//activates dotenv -> reads your .env file and loads values into process.env so code can access them
dotenv.config();

//creates the Express server
const app = express();
const PORT =  30001;

//adds headers to every response
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

//lets Express read JSON from request bodies
app.use(express.json());

app.use("/api/weather", weatherRoutes)

// TDOD: Add global error handler middleware (must be after all routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: {err: "An error has occurred ❌."}
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // create a console log
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


//starts the server on a specific port
app.listen(3001, () => console.log("Server running on port 3001"));

export default app;
