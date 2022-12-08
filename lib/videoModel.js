import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    uploadedAt: {
      type: Date,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "movie",
      enum: ["movie", "music"],
    },
  },
  { timestamps: true }
);

const Video = mongoose.models.video || mongoose.model("video", videoSchema);
export default Video;
