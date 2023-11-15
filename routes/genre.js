import express from "express";
import { createGenre,getGenre } from "../controller/genre.js";



const genreRouter = express.Router();

genreRouter.use(express.urlencoded({ extended: true }));
genreRouter.get("/getgenre", getGenre);
genreRouter.post("/create-genre", createGenre);

export default genreRouter;
