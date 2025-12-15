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



// GET pending products
export const getPendingProducts = () => {
  const token = localStorage.getItem("adminToken");
  return axiosClient.get("/admin/products/pending", {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// GET approved products
export const getApprovedProducts = () => {
  const token = localStorage.getItem("adminToken");
  return axiosClient.get("/admin/products/approved", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// GET single product by ID
export const getProductById = (id) => {
  const token = localStorage.getItem("adminToken");
  return axiosClient.get(`/admin/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// APPROVE product
export const approveProduct = (id) => {
  const token = localStorage.getItem("adminToken");
  return axiosClient.put(
    `/admin/products/approve/${id}`,
    {}, // empty body
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// GET rejected products
export const getRejectedProducts = () => {
  const token = localStorage.getItem("adminToken");
  return axiosClient.get("/admin/products/rejected", {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// REJECT product
export const rejectProduct = (id) => {
  const token = localStorage.getItem("adminToken");
  return axiosClient.put(
    `/admin/products/reject/${id}`,
    {}, // empty body
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

