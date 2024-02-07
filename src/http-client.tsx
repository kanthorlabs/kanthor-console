import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const client = axios.create({
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    config.headers.set("Idempotency-Key", uuidv4());
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
