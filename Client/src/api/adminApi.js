import axiosClient from "./axiosClient";

//------------- ADMIN REGISTER ----------------
export const registerAdmin = async (data) => {
  return axiosClient.post("/admin/register", data, {
    headers: {
      "x-admin-secret": "another_super_secret_for_register"
    }
  });
};

// ---------------- ADMIN LOGIN ----------------
export const loginAdmin = async (data) => {
  return axiosClient.post("/admin/login", data);
};

// ---------------- RETAILERS ----------------
export const getAllRetailers = () => axiosClient.get("/admin/retailers");

export const getRetailerById = (id) => axiosClient.get(`/admin/retailer/${id}`);

// ---------------- PRODUCTS (Admin) ----------------
export const getPendingProducts = () => {
  const token = localStorage.getItem("adminToken");
  return axiosClient.get("/admin/products/pending", {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getApprovedProducts = () => axiosClient.get("/admin/products/approved");

export const getProductById = (id) => axiosClient.get(`/admin/products/${id}`);

export const approveProduct = (id) =>
  axiosClient.put(`/admin/products/approve/${id}`);

export const rejectProduct = (id) =>
  axiosClient.put(`/admin/products/reject/${id}`);
