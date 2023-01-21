import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API,
});

const { get, post, put, delete: destroy } = apiClient;

export { get, post, put, destroy, apiClient };
