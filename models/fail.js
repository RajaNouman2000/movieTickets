import mongoose from "mongoose";

const failjobSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
  },
  to: {
    type: String,
  },
  subject: {
    type: String,
  },
  text: {
    type: String,
  },
});

const FailJobModel = mongoose.model("failjob", failjobSchema);

export default FailJobModel;
