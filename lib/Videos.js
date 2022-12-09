import axios from "axios";
import translate from "./translate";
import { getUser } from "./Auth";

export async function getYTVideos(type) {
  let data = null;
  const search =
    type == "movie" ? "official movie trailer" : "official music video";
  const key = process.env.NEXT_PUBLIC_YT_KEY;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&regionCode=us&order=date&order=rating&type=video&maxResults=5&q=${search}&key=${key}`;
  const res = await fetch(url, {
    headers: { "content-type": "application/json" },
  });
  const response = await res.json();
  if (!response.error && response) {
    const result = await parseData(response, type);
    console.log(result, type);
    data = await axios.put("/api/addVideos", { data: result });
  } else {
    data = await axios.put("/api/getVideos", { type });
  }
  return data.data.data;
}

export async function getVideoById(id, user) {
  try {
    const { data } = await axios.put("/api/getVideos", { id, user });
    if (!data) throw new Error("No such video found.");
    return data.data[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getUserVideos(user) {
  try {
    const { data } = await axios.put("/api/getVideos", { user });
    if (!data) throw new Error("Videos not found.");
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getMoreVideos() {
  try {
    const { data } = await axios.put("/api/getVideos", { more: true });
    if (!data) throw new Error("Videos not found.");
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

const vidService = { getYTVideos, getVideoById, getUserVideos, getMoreVideos };
export default vidService;

async function parseData(data, type) {
  const parsedData = [];
  for (let d of data.items) {
    const name =
      (await translate(htmlToString(d.snippet.title))) ||
      d.snippet.title ||
      "بی نام";
    const description =
      (await translate(htmlToString(d.snippet.description))) || "...";
    const item = {
      videoId: d.id.videoId,
      name,
      description,
      type,
      uploadedAt: d.snippet.publishedAt,
      imgUrl:
        d.snippet.thumbnails?.maxres?.url ||
        d.snippet.thumbnails?.standard?.url ||
        d.snippet.thumbnails?.high?.url ||
        d.snippet.thumbnails?.medium?.url ||
        d.snippet.thumbnails?.default?.url,
    };
    parsedData.push(item);
  }
  return parsedData;
}

function htmlToString(str) {
  const REG = /&#?([\w\d]+);/g;
  return str.replace(REG, function (match, grp) {
    if (match == "&amp;") return "&";
    const num = parseInt(grp);
    return String.fromCharCode(num);
  });
}
