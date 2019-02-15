import axios from "axios";
// change to environment variable
const baseURL = "http://localhost:3000/api";
const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
