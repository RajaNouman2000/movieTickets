import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  cityName: String,
  temperature: Number,
  humidity: Number,
  wind: Object,
  lastUpdated: Date,
});
const WeatherModel = mongoose.model("Weather", weatherSchema);
export default WeatherModel;
