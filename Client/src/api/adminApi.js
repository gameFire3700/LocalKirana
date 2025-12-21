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

export const createCategory = (formdata) =>{
 return axiosClient.post("/category/create", formdata,
  {
      headers: {
        "Content-Type": "multipart/form-data" // 🔥 REQUIRED
      }
  }
 );
};

export const getCategories = (data) =>
  axiosClient.get("/category/",data);

export const createSubCategory = (data) =>
  axiosClient.post("/subcategories/create", data);

export const getSubCategories = (category) =>
  axiosClient.get(`/subcategories/by-category/${category}`);

export const createProductMaster = (data) =>
  axiosClient.post("/product-master/create", data);


export const getProductMasters = (data) =>
  axiosClient.get("/product-master/",data);



export const getProductMasterById = (id) =>
  axiosClient.get(`/product-master/${id}`);


//NEW ---------- 

export const  getPendingRetailerProducts = (data) =>
  axiosClient.get("/retailer-products/admin/pending",data);


export const  updateProductMaster = (id) =>
  axiosClient.put(`/product-master/${id}`);

export const deleteProductMaster = (id) =>
  axiosClient.delete(`/product-master/${id}`);



export const  getPendingSellerProducts = (data) =>
  axiosClient.get("/admin/retailer-products/pending",data); 

export const approveRetailerProduct = (id) =>
  axiosClient.put(`/admin/retailer-products/approve/${id}`);

export const rejectRetailerProduct = (id) =>
  axiosClient.put(`/admin/retailer-products/reject/${id}`);

export const getApprovedRetailerProducts = (data) =>
  axiosClient.get("/admin/retailer-products/approved",data);  

export const getRejectedRetailerProducts = (data) =>
  axiosClient.get("/admin/retailer-products/rejected",data);


export const getRetailerProductById = (id) =>
  axiosClient.get(`/admin/retailer-products/${id}`);

