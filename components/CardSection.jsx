import Card from "./Card";
import {
  portrait,
  landscape,
  heading,
  portraitCards,
  landscapeCards,
} from "./CardSection.module.css";
export default function CardSection({ title, type, data }) {
  return (
    <section className={type ? portrait : landscape}>
      {data && (
        <>
          <h2 className={heading}>{title}</h2>
          <div className={type ? portraitCards : landscapeCards}>
            {data.map(({ videoId, name, uploadedAt, imgUrl }) => (
              <Card
                key={videoId}
                videoId={videoId}
                type={type}
                name={name}
                uploadedAt={uploadedAt}
                imgUrl={imgUrl}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
