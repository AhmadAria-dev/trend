import connectDB from "../../lib/DB";
import Videos from "../../lib/videoModel";
import User from "../../lib/userModel";
export default async function getVideos(req, res) {
  try {
    let response = null;
    connectDB();
    if (req.body.id) {
      response = [await Videos.findOne({ videoId: req.body.id })];
      if (req.body.user) {
        const user = await User.findById(req.body.user);
        if (
          user &&
          response[0]?.videoId &&
          !user.watched.includes(req.body.id)
        ) {
          await User.findOneAndUpdate(
            { _id: user._id },
            { $push: { watched: req.body.id } }
          );
        }
      }
    } else if (req.body.user && !req.body.id) {
      const { watched } = await User.findById(req.body.user);
      const list = watched.slice(watched.length - 5);
      response = await Videos.find({ videoId: { $in: list } });
    } else if (req.body.type)
      response = await Videos.find({ type: req.body.type })
        .limit(5)
        .sort("-uploadedAt");
    else if (req.body.more)
      response = await Videos.find().limit(5).sort("uploadedAt");
    else if (!req.body)
      throw new Error("Please provide a parameter (id/user/type/more).");
    else return {};

    if (!response || response.length <= 0) throw new Error("No videos found.");
    const data = response.map((item) => ({
      videoId: item.videoId,
      name: item.name,
      description: item.description,
      uploadedAt: item.uploadedAt,
      imgUrl: item.imgUrl,
    }));
    res.status(200).json({ data });
  } catch (error) {
    res.status(403).json({
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : "",
    });
  }
}
