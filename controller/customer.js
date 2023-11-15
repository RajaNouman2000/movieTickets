import { Customer, customerValidationSchema } from "../models/Customer.js";

export const getCustomer = async (req, res) => {
  const token = req.headers.token;
  console.log(token);
  try {
    const users = await Customer.find();
    res.send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCustomerDetail = async (req, res) => {
  const { id } = req.body;
  try {
    const users = await Customer.findOne({ _id: id });
    res.send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const { firstName, lastName, email, subscriptionType } = req.body;

  const { error } = customerValidationSchema.validate({
    firstName,
    lastName,
    email,
    subscriptionType,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      subscriptionType,
    });
    console.log(customer);
    res.send("Customer create Successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
