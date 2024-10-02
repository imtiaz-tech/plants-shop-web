import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5400/api/v1/"
    // : "https://plants-shop-web-rl6e-ew5y9t92d-imtiaz-techs-projects.vercel.app/api/v1/";
    : "https://plants-shop-backend.vercel.app/api/v1/";

export default axios;
