import { isEmail } from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../lib/userModel.js";
import connectDB from "../../lib/DB";

export default async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (email.length > 250 || password.length > 250) return;
    if (!email) throw new Error("Email is required.");
    if (!isEmail(email)) throw new Error("Please enter an email address.");
    if (!password) throw new Error("Please enter a password.");
    await connectDB();
    const response = await User.findOne({ email });
    if (!response) throw new Error("Invalid credentials.");
    const isCorrectPassword = await bcrypt.compare(password, response.password);
    if (!isCorrectPassword) throw new Error("Invalid credentials.");
    const token = jwt.sign({ userId: response._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const user = {
      userId: response._id,
      username: response.username,
      email: response.email,
      createdAt: response.createdAt,
      token,
    };
    res.status(200).json(user);
  } catch (error) {
    res.status(403).json({
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : "",
    });
  }
}
