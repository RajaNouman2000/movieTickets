import { User, userValidationSchema } from "../models/Users.js";
import jwt from "jsonwebtoken";
import emailVerification from "../MailSending/emailverification.js";
import optVerification from "../MailSending/optverification.js";

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
  const { token } = req.params;
  console.log(req.params);

  try {
    // Verify the token against the stored tokens in the database
    const user = await User.findOne({ rememberToken: token });

    if (!user) {
      return res.status(404).json({ error: "Invalid verification token" });
    }

    await User.updateOne(
      { email: user.email },
      { $set: { rememberToken: null } }
    );
    console.log(user);

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

  const rememberToken = generateToken();
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      rememberToken,
    });

    console.log(user._id.getTimestamp());

    for (let i = 0; i < 10; i++) {
      emailVerification.add({
        to: user.email,
        subject: "Email Verification",
        html: `<html><p>Click the following button to verify your email</p><button><a href=http://localhost:8080/verify/${rememberToken}>Verify</a></button></html>`,
        text: `Click the following link to verify your email: http://localhost:8080/verify/${rememberToken}`,
        type: "emailVerification",
      });
    }

    res.send("User created successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const opt = generateToken();
  for (let i = 0; i < 10; i++) {
    optVerification.add({
      to: email,
      subject: "OPT Verification",
      text: `Your Opt is :${opt}`,

      html: `<html><p>Your opt is :${opt}</p><button><a href=http://localhost:8080/verifyopt/${opt}>click to verify</a></button></html>`,
      type: "otp",
    });
  }

  console.log(email, password);

  try {
    const loggedInUser = await User.login(email, password);
    const token = createToken(loggedInUser._id);
    res.status(200).json({ user: loggedInUser._id, token: token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
