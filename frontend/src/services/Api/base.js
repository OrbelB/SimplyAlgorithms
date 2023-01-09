import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const AWS_BASE_URL = 'https://www.api.simplyalgorithms.com';

const LOCALHOST_BASE_URL = 'http://localhost:5000';
const apiClient = axios.create({
  baseURL: LOCALHOST_BASE_URL,
});

const { get, post, put, delete: destroy } = apiClient;

export { get, post, put, destroy, apiClient };
