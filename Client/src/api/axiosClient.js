import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});


axiosClient.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const retailerToken = localStorage.getItem("retailerToken");

  // Admin routes start with /admin
  if (config.url.startsWith("/admin") && adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  // Retailer routes start with /product/retailer or /retailer
  else if (config.url.startsWith("/product/retailer") && retailerToken) {
    config.headers.Authorization = `Bearer ${retailerToken}`;
  }

  return config;
});


export default axiosClient;
