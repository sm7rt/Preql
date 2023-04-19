import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;
console.log('baseUrl', baseURL, {
  API_URL: process.env.API_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
const client = axios.create({
  baseURL,
});
const getApiClient = () => {
  return client;
};

export { getApiClient };
