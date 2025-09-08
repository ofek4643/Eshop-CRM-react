import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://eshop-project-react.onrender.com/api",
  withCredentials: true,
});
