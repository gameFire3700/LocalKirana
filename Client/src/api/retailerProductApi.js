// src/api/retailerProductApi.js
import axiosClient from "./axiosClient";

// --- PRODUCTS ---
export const addRetailerProduct = (formData) =>
  axiosClient.post("/product/retailer/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getRetailerProducts = (retailerId) =>
  axiosClient.get(`/product/retailer/${retailerId}`);

export const updateRetailerProduct = (id, formData) =>
  axiosClient.put(`/product/retailer/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteRetailerProduct = (id) =>
  axiosClient.delete(`/product/retailer/delete/${id}`);

export default axiosClient;
