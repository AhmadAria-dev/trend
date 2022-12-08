import axios from "axios";

function storeUser(data) {
  if (localStorage) localStorage.setItem("trendUser", JSON.stringify(data));
}

export async function register(formData) {
  try {
    const { data } = await axios.post("/api/register", formData);
    if (data) storeUser(data);
    return data;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}

export async function login(formData) {
  try {
    const { data } = await axios.put("/api/login", formData);
    if (data) storeUser(data);
    return data;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}

export function logout() {
  if (typeof localStorage == "undefined") return;
  localStorage.removeItem("trendUser");
}

export function getUser() {
  if (typeof localStorage == "undefined") return;
  return JSON.parse(localStorage.getItem("trendUser"));
}

const authService = { register, login, logout, getUser };
export default authService;
