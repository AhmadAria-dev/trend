import { isEmail, isStrongPassword } from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../lib/userModel.js";
import connectDB from "../../lib/DB";

export default async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (username.length > 250 || email.length > 250 || password.length > 250)
      return;
    if (!username) throw new Error("username is required.");
    if (username.length < 3)
      throw new Error("username must be at least 3 characters.");
    if (username.length > 50)
      throw new Error("username must not be more than 50 characters.");
    if (!email) throw new Error("email is required.");
    if (!isEmail(email)) throw new Error("Please enter a valid email address.");
    if (!password) throw new Error("password is required.");
    if (
      !isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
    )
      throw new Error(
        "Please enter a valid password with at least 8 characters, one lowercase, one uppercase, one number and one symbol."
      );

    await connectDB();
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists.");
    const salt = await bcrypt.genSalt(9);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = { username, email, password: hashedPassword };
    const response = await User.create(data);
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
