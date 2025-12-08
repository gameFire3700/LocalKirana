import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// auto attach token 
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("retailerToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config; 
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default axiosClient;
