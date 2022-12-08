import { background, container, bars } from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={background}>
      <div className={container}>
        <div className={bars}></div>
        <div className={bars}></div>
        <div className={bars}></div>
        <div className={bars}></div>
      </div>
    </div>
  );
}
