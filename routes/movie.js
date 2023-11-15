import express from "express";
import { createMovie, getMovie } from "../controller/movie.js";

const movieRouter = express.Router();

movieRouter.use(express.urlencoded({ extended: true }));
movieRouter.get("/getmovie", getMovie);
movieRouter.post("/create-movie", createMovie);

export default movieRouter;
