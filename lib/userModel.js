import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "accountName is required."],
      maxLength: [50, "accountName must not be more than 50 characters."],
      minLength: [3, "accountName must be at least 3 characters."],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Email is required."],
      unique: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address.",
      },
    },
    password: {
      type: String,
      require: [true, "Password is required."],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    watched: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
