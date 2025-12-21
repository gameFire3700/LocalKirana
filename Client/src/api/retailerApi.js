// src/api/retailerApi.js
import axiosClient from "./axiosClient";

export const fetchMasterProducts = () =>
  axiosClient.get("/product-master/active");

export const addRetailerProduct = (data) =>
  axiosClient.post("/retailer-product/add", data);


export const fetchMyRetailerProducts = () =>
  axiosClient.get("/retailer-product/my-products");


// --- AUTH ---
export const retailerRegister = (data) =>
  axiosClient.post("/retailer/register", data);

export const retailerLogin = (data) =>
  axiosClient.post("/retailer/login", data);

// --- PRODUCTS ---
export const fetchMyProducts = () =>
  axiosClient.get("/product/retailer/my-products");

export const createProduct = (formData) =>
  axiosClient.post("/product/retailer/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (id, formData) =>
  axiosClient.put(`/product/retailer/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProduct = (id) =>
  axiosClient.delete(`/product/retailer/delete/${id}`);

export const fetchInventory = () =>
  axiosClient.get("/product/retailer/products");


export const getProductMasters = () =>
  axiosClient.get("/product-master/");

export const requestAddProduct = (formData) => {
  return axiosClient.post(
    "/retailer-products/request",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data" // 🔥 REQUIRED
      }
    }
  );
};

export const getRetailerProducts   = (data) =>
  axiosClient.get("/retailer-products/my-products", data);

export const  updateRetailerProduct  = (id) =>
  axiosClient.put(`/retailer-products/${id}`);

export const  deleteRetailerProduct  = (id) =>
  axiosClient.put(`/retailer-products/${id}`);

