import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = "http://54.81.78.102:7662";

instance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("x-auth-token");
    if (access_token) {
      const parsedData = access_token;
      const accessToken = parsedData;
      config.headers["x-auth-token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
    (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem("x-auth-token");
    }
  }
);

export default instance;
