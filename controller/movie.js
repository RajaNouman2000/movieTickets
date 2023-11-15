import Movie from "../models/Movie.js";
import Genre from "../models/Genre.js";

export const getMovie = async (req, res) => {
  try {
    const users = await Movie.find();
    res.send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createMovie = async (req, res) => {
  const { title, language, rating, price, genreID } = req.body;
  console.log(req.body);

  try {
    // Find the Genre document based on the provided genreName
    const genre = await Genre.findOne({ genreName: genreID });

    // Check if the genre exists
    if (!genre) {
      return res.status(400).json({ error: "Genre not found" });
    }

    const movie = await Movie.create({
      title,
      language,
      rating,
      price,
      genreID: genre, // Use the _id of the found genre
    });

    console.log(movie);
    res.send("Movie created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
