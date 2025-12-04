// src/api/retailerApi.js
import axiosClient from "./axiosClient";

// --- AUTH ---
export const retailerRegister = (data) =>
  axiosClient.post("/retailer/register", data);

export const retailerLogin = (data) =>
  axiosClient.post("/retailer/login", data);

// helper to build auth headers
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("retailerToken")}`,
});

// --- PRODUCTS ---
export const fetchMyProducts = () =>
  axiosClient.get("/product/retailer/my-products", {
    headers: authHeaders(),
  });

export const createProduct = (formData) =>
  axiosClient.post("/product/retailer/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeaders(),
    },
  });

export const updateProduct = (id, formData) =>
  axiosClient.put(`/product/retailer/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeaders(),
    },
  });

export const deleteProduct = (id) =>
  axiosClient.delete(`/product/retailer/delete/${id}`, {
    headers: authHeaders(),
  });

export const fetchInventory = () =>
  axiosClient.get("/product/retailer/products", {
    headers: authHeaders(),
  });
