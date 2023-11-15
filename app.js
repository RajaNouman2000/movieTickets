import mongoose from "mongoose";

import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import customerRouter from "./routes/customer.js";
import genreRouter from "./routes/genre.js";
import movieRouter from "./routes/movie.js";
import rentalRouter from "./routes/rental.js";

// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
  console.error(result.error);
}
// Now you can access your environment variables using process.env
const dbURI = process.env.db;
const port = process.env.port;

const app = express();
app.use("/", userRouter);
app.use("/", customerRouter);
app.use("/", genreRouter);
app.use("/", movieRouter);
app.use("/", rentalRouter);

// Middleware to parse JSON data from the request body
app.use(express.json());

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => console.log("listening"));
  })
  .catch((error) => console.log(error));
