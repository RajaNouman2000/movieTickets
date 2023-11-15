import express from "express";
import { createRental, getRental } from "../controller/rental.js";

const rentalRouter = express.Router();

rentalRouter.use(express.urlencoded({ extended: true }));
rentalRouter.get("/getrental", getRental);
rentalRouter.post("/create-rental", createRental);

export default rentalRouter;
