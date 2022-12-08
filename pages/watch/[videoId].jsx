import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import CardSection from "../../components/CardSection";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  resetVideo,
  resetMoreVideos,
  getVideoById,
  getMoreVideos,
} from "../../features/videos/vidSlice";
import {
  layout,
  container,
  heading,
  sVideo,
  info,
  videoDesc,
  videoInfo,
  sMoreVideos,
} from "../../styles/Watch.module.css";
export default function Watch() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const { video, moreVideos, isError, isLoading, message, isSuccess } =
    useSelector((state) => state.vids);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    setUrl(
      `https://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1`
    );
    try {
      dispatch(getVideoById({ id: router.query.videoId, user: user.userId }));
      if (isSuccess) dispatch(reset());
      dispatch(getMoreVideos());
      if (isSuccess) dispatch(resetMoreVideos());
      if (isError) console.error(message);
    } catch (error) {
      dispatch(resetVideo());
    }
  }, [dispatch, isError, user, url]);
  return (
    <>
      <Head>
        <title>{video && video.name}</title>
      </Head>
      <Navbar />
      {isLoading && <Loader />}
      <div className={layout}>
        {video && (
          <main className={container}>
            <h1 className={heading}>{video.name}</h1>
            {url && (
              <ReactPlayer
                controls={true}
                className={sVideo}
                url={url}
                width="100%"
                height="100%"
              ></ReactPlayer>
            )}
            <section className={info}>
              <div className={videoDesc}>
                <p>{video.description}</p>
              </div>
              <div className={videoInfo}>
                <p>{video.uploadedAt}</p>
              </div>
            </section>
          </main>
        )}
        <aside className={sMoreVideos}>
          <CardSection type={0} data={moreVideos} title="بیشتر ببینید" />
        </aside>
      </div>
    </>
  );
}
