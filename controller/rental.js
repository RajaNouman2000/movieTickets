import Rental from "../models/rental.js";
import Customer from "../models/Customer.js";
import Movie from "../models/Movie.js";

export const getRental = async (req, res) => {
  try {
    const users = await Rental.find();
    res.send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createRental = async (req, res) => {
  const { title, firstName } = req.body;
  console.log(req.body);

  try {
    // Find the Genre document based on the provided genreName
    const customer = await Customer.findOne({ firstName: firstName });
    const movie = await Movie.findOne({ title: title });

    // Check if the genre exists
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }
    if (!movie) {
      return res.status(400).json({ error: "Movies  not found" });
    }

    const rental = await Rental.create({
      customer,
      movie,
    });

    console.log(rental);
    res.send("rental created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
