import nodemailer from "nodemailer";
import JobModel from "../models/emailQueue.js";

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajanouman2000@gmail.com",
    pass: "sdqfurnbzaqlflqj",
  },
});

export async function saveDataJobCollection(_id, to, subject, text) {
  try {
    const job = await JobModel.create({
      _id: parseInt(_id),
      to,
      subject,
      text,
    });
    console.log("Job data saved to MongoDB:", job);
    return job;
  } catch (error) {
    console.error("Error saving job data to MongoDB:", error.message);
    throw error; // Rethrow the error to propagate it up the call stack
  }
}

export default { transport, saveDataJobCollection };
