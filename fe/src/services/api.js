import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  baseURL: 'http://localhost:4000',
  timeout: 12000
});
