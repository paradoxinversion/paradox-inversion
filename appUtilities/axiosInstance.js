import axios from "axios";
// const baseURL =
//   process.env.NODE_ENV === "production" ||
//   window.location.host.includes("localhost")
//     ? "https://paradoxinversion.com/api"
//     : "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api"
});

export default axiosInstance;

// import axios from "axios";
// const baseURL = window.location.host.includes("localhost")
//   ? "http://localhost:3000/api"
//   : "http://paradoxinversion.com/api";
// const axiosInstance = axios.create({
//   baseURL
// });

// export default axiosInstance;
