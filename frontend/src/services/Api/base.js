import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const { get, post, put, delete: destroy } = apiClient;

export { get, post, put, destroy };
