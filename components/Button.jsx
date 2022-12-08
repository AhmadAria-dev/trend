import { btnRed, btnBlue } from "./Button.module.css";

export default function Button({
  cls,
  children,
  type = "button",
  handleClick = null,
}) {
  return (
    <button
      type={type}
      className={cls == "btnBlue" ? btnBlue : btnRed}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
