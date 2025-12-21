import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const retailerToken = localStorage.getItem("retailerToken");

    // 🔒 always ensure headers exist
    config.headers = config.headers || {};

    const url = config.url || "";

    // ✅ ADMIN protected routes
    if (
      adminToken &&
      (
        url.startsWith("/admin") ||
        url.startsWith("/category") ||
        url.startsWith("/subcategories") ||
        url.startsWith("/product-master") || 
         url.startsWith("/retailer-products/admin")||
         url.startsWith("/admin/retailer-products")
      )
    ) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } 

    // ✅ RETAILER protected routes
    else if (
      retailerToken &&
      (
        url.startsWith("/retailer-products") || 
        url.startsWith("/retailer")
      )
    ) {
      config.headers.Authorization = `Bearer ${retailerToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
