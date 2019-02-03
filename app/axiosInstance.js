import axios from "axios";
const baseURL = window.location.host.includes("localhost")
  ? "http://localhost:3000/api"
  : "http://paradox-inversion.herokuapp.com/api";
const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
