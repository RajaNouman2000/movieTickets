import Queue from "bull";
import { transport, saveDataJobCollection } from "./transporter.js";
import JobModel from "../models/emailQueue.js";

// Function to save job data to MongoDB

const optVerification = new Queue("opt", {
  limiter: {
    max: 10,
    duration: 1000,
  },
});

optVerification.process(async (job) => {
  const { to, subject, text, html } = job.data;
  let _id = job.id;
  const mailOptions = {
    from: "rajanouman2000@gmail.com",
    to,
    subject,
    html,
  };

  try {
    // Save job data to MongoDB before processing
    await saveDataJobCollection(_id, to, subject, text);

    // Process the job (send email)
    await transport.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);

    transport.close();
    await JobModel.deleteOne({ _id: job.id });
  } catch (error) {
    console.error("Error processing email job:", error.message);
  }
});

export default optVerification;
