import Videos from "../../lib/videoModel";
import connectDB from "../../lib/DB";

export default async function addVideos(req, res) {
  const result = [];
  try {
    if (!req.body.data || req.body.data.length <= 0)
      throw new Error("Please provide data.");
    connectDB();
    for (const data of req.body.data) {
      let response = {};
      const { videoId, name, description, imgUrl } = data;
      if (!videoId || !name || !description || !imgUrl)
        throw new Error("All fields are required.");
      const exists = await Videos.findOne({ videoId });
      if (!exists) {
        response = await Videos.create(data);
      }
      const dbData = {
        videoId: response?.videoId,
        name: response?.name,
        description: response?.description,
        imgUrl: response?.imgUrl,
        uploadedAt: response?.uploadedAt,
      };
      const vData = {
        videoId: data?.videoId,
        name: data?.name,
        description: data?.description,
        imgUrl: data?.imgUrl,
        uploadedAt: data?.uploadedAt,
      };

      response?.hasOwnProperty() ? result.push(dbData) : result.push(vData);
    }
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(403).json({
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : "",
    });
  }
}
