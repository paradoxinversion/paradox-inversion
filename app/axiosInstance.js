import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production" ||
  window.location.host.includes("localhost")
    ? "http://localhost:3000/api"
    : "https://paradoxinversion.com/api";
const axiosInstance = axios.create({
  baseURL: process.env.API_URL
});

export default axiosInstance;
