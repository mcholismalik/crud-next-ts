import axios, { AxiosRequestHeaders } from 'axios';

const headers: AxiosRequestHeaders = {
  'Content-Type': 'application/json'
};
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3100/v1';

export const api = axios.create({
  baseURL,
  headers
});

export const routes = {
  priceEstimation: {
    estimate: '/price_estimation/estimate',
    brands: '/price_estimation/query_param/brands',
    categories: '/price_estimation/query_param/categories',
    sizes: '/price_estimation/query_param/sizes',
    colors: '/price_estimation/query_param/colors'
  }
};
