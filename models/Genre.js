import mongoose from "mongoose";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
  genreName: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Genre = mongoose.model("genre", customerSchema);

export const genreValidationSchema = Joi.object({
  genreName: Joi.string().max(20).required(),
});

export default { Genre, genreValidationSchema };
