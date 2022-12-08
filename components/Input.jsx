import { inputs } from "./Input.module.css";

export default function Input({ type, id, placeholder, value, handleChange }) {
  return (
    <input
      className={inputs}
      type={type}
      name={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
