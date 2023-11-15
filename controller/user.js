import { User, userValidationSchema } from "../models/Users.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "02763cde24ebc8",
    pass: "ec9ff6b32300a6",
  },
});

function generateToken() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let token = "";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    token += alphabet[randomIndex];
  }
  return token;
}

const createToken = (id) => {
  return jwt.sign({ id }, "raja nouman secret", { expiresIn: 12 * 60 * 60 });
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDetail = async (req, res) => {
  const { id } = req.body;
  try {
    const users = await User.findOne({ _id: id });
    res.send(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { rememberToken } = req.params;
  console.log(rememberToken);

  try {
    // Verify the token against the stored tokens in the database
    const user = await User.findOne({ rememberToken: rememberToken });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "Invalid verification token" });
    }

    // Update the user's status to indicate email verification

    user.rememberToken = null;
    console.log(user);
    const userveri = await user.save();
    console.log(userveri);

    res.send({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate the request body
  const { error } = userValidationSchema.validate({
    firstName,
    lastName,
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const token = generateToken();
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      rememberToken,
    });

    console.log(user);
    const mailOptions = {
      from: "rajanouman2000@gmail.com",
      to: req.body.email,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://localhost:8080/verify/${rememberToken}`,
    };

    // Send the email
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error.message);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.send("User created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const loggedInUser = await User.login(email, password);
    const token = createToken(loggedInUser._id);
    res.status(200).json({ user: loggedInUser._id, token: token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
