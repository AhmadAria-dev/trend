import Head from "next/head";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import CardSection from "../components/CardSection";
import { container } from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieVideos,
  getMusicVideos,
  getWatchedVideos,
  reset,
  resetAll,
  resetWatched,
} from "../features/videos/vidSlice";

import { useEffect } from "react";
export default function Home() {
  const dispatch = useDispatch();
  const { movies, musics, watched, isError, isLoading, isSuccess, message } =
    useSelector((state) => state.vids);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    try {
      dispatch(getMovieVideos());
      if (isSuccess) dispatch(reset());
      dispatch(getMusicVideos());
      if (isSuccess) dispatch(reset());
      if (user) dispatch(getWatchedVideos(user.userId));
      else dispatch(resetWatched());
      if (isSuccess) dispatch(reset());
      if (isError) console.error({ message });
    } catch (error) {
      console.error(error);
      dispatch(resetAll());
    }
  }, [dispatch, user]);
  return (
    <>
      <Head>
        <title>Trend</title>
        <meta
          name="description"
          content="Watch latest movies and music videos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(isLoading || musics.length <= 0 || movies.length <= 0) && <Loader />}
      <Navbar />
      <main className={container}>
        <CardSection data={movies} type={1} title="فلم های جدید" />
        <CardSection data={musics} type={1} title="آهنگ های جدید" />
        {watched && watched.length > 0 && (
          <CardSection data={watched} type={1} title="دو باره تماشا کنید" />
        )}
      </main>
    </>
  );
}
