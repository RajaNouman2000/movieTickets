import mongoose from "mongoose";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscriptionType: {
    type: String,
    required: true,
  },
});

export const Customer = mongoose.model("customer", customerSchema);

export const customerValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  subscriptionType: Joi.string().min(3).max(10).required(),
});

export default { Customer, customerValidationSchema };
