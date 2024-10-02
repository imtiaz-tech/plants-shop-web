import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5400/api/v1/"
    : "https://plants-shop-web-rl6e-nc3ndq7pm-imtiaz-techs-projects.vercel.app/api/v1/";

export default axios;
