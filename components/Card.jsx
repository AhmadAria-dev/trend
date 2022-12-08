import Link from "next/link";
import { useState, useEffect } from "react";
import { portrait, landscape, video, videoInfo } from "./Card.module.css";

export default function Card({ type, videoId, name, uploadedAt, imgUrl }) {
  const [showInfo, setShowInfo] = useState(false);
  const handleShowInfo = () => setShowInfo(true);
  const handleHideInfo = () => {
    if (type) setShowInfo(false);
  };

  useEffect(() => {
    if (!type) setShowInfo(true);
  }, [type]);
  return (
    <Link
      href={`/watch/${videoId}`}
      className={type ? portrait : landscape}
      onMouseEnter={handleShowInfo}
      onMouseLeave={handleHideInfo}
      dir="ltr"
    >
      {showInfo && (
        <div className={videoInfo} dir="rtl">
          <p>{name}</p>
          <p>{uploadedAt}</p>
        </div>
      )}
      <div
        className={video}
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
    </Link>
  );
}
