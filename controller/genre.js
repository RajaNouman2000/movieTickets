import { Genre, genreValidationSchema } from "../models/Genre.js";

export const getGenre = async (req, res) => {
  try {
    const genre = await Genre.find();
    res.send(genre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createGenre = async (req, res) => {
  const { genreName } = req.body;

  const error = genreValidationSchema.validate({
    genreName,
  });

  try {
    const genre = await Genre.create({ genreName });
    console.log(genre);
    res.send("Genre create Successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
