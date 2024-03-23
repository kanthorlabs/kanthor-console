import axios from "axios";
import uuid from "ui7";

const httpc = axios.create({ withCredentials: true });

httpc.interceptors.request.use(
  (config) => {
    config.headers.set("Idempotency-Key", uuid());
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpc;
