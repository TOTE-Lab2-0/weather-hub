import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//activates dotenv -> reads your .env file and loads values into process.env so code can access them
dotenv.config();

//creates the Express server
const app = express();

//adds headers to every response
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

//lets Express read JSON from request bodies
app.use(express.json());

//test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

//starts the server on a specific port
app.listen(3001, () => console.log("Server running on port 3001"));

export default app;
