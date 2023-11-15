// rentalModel.js
import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.Mixed, // Use Mixed type to store the entire movie document
    required: true,
  },
  rentalDate: {
    type: Date,
    default: Date.now,
  },
});

const Rental = mongoose.model("rental", rentalSchema);

export default Rental;
