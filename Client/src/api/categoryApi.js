import axiosClient from "./axiosClient";

/* =======================================================
   🟢 Get all active categories
======================================================= */
export const fetchCategories = async () => {
  try {
    const res = await axiosClient.get("/category/all");
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false };
  }
};

/* =======================================================
   🟢 Get single category by ID
======================================================= */
export const fetchCategoryById = async (id) => {
  try {
    const res = await axiosClient.get(`/category/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return { success: false };
  }
};

/* =======================================================
   🟢 Create category (with image upload)
======================================================= */
export const createCategory = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    const res = await axiosClient.post("/category/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false };
  }
};

/* =======================================================
   🟢 Update category
======================================================= */
export const updateCategory = async (id, data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    const res = await axiosClient.put(`/category/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false };
  }
};

/* =======================================================
   🟢 Delete category
======================================================= */
export const deleteCategory = async (id) => {
  try {
    const res = await axiosClient.delete(`/category/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false };
  }
};
