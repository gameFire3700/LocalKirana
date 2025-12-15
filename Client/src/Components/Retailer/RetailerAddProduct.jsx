import React, { useState, useEffect } from "react";
import RetailerSidebar from "./RetailerSidebar";
import { createProduct } from "../../api/retailerApi";
import axiosClient from "../../api/axiosClient";

const RetailerAddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    cost_price: "",
    mrp: "",
    discount: "",
    stock: "",
    sku: "",
    unit: "",
    category: "",
    category_name: "",
    brand: "",
    tax_rate: "",
    expiry_date: "",
    manufacture_date: "",
    weight: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // ✅ new state

  /* ==========================================================
        LOAD CATEGORIES
  ========================================================== */
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axiosClient.get("/category/all");
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      console.log("Category fetch error:", err);
    }
  };

  /* ==========================================================
        HANDLE INPUT
  ========================================================== */
  const onChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /* ==========================================================
        IMAGE PREVIEW HANDLER
  ========================================================== */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ==========================================================
        VALIDATION
  ========================================================== */
  const validate = () => {
    const e = {};

    if (!data.name.trim()) e.name = "Product name is required";
    if (!data.price || isNaN(data.price)) e.price = "Valid price required";
    if (!data.cost_price || isNaN(data.cost_price)) e.cost_price = "Valid cost price required";
    if (!data.mrp || isNaN(data.mrp)) e.mrp = "Valid MRP required";
    if (data.discount && isNaN(data.discount)) e.discount = "Discount must be a number";
    if (!data.stock || isNaN(data.stock)) e.stock = "Valid stock required";
    if (!data.sku.trim()) e.sku = "SKU is required";
    if (!data.unit.trim()) e.unit = "Unit is required";
    if (!data.category) e.category = "Please select category";
    if (!data.brand.trim()) e.brand = "Brand is required";
    if (!data.tax_rate || isNaN(data.tax_rate)) e.tax_rate = "Valid tax rate required";
    if (!data.manufacture_date) e.manufacture_date = "Manufacture date required";
    if (!data.expiry_date) e.expiry_date = "Expiry date required";

    if (!image) e.image = "Product image is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ==========================================================
        SUBMIT
  ========================================================== */
  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    Object.keys(data).forEach((k) => fd.append(k, data[k]));
    fd.append("image", image);

    try {
      const res = await createProduct(fd);
      if (res.data.success) {
        // ✅ show success message instead of navigating
        setSuccessMessage("Your product has been added! It will be approved by the admin shortly.");
        setData({
          name: "",
          description: "",
          price: "",
          cost_price: "",
          mrp: "",
          discount: "",
          stock: "",
          sku: "",
          unit: "",
          category: "",
          category_name: "",
          brand: "",
          tax_rate: "",
          expiry_date: "",
          manufacture_date: "",
          weight: "",
        });
        setImage(null);
        setPreview(null);
        setErrors({});
      }
    } catch (err) {
      const d = err.response?.data;
      setErrors({
        general: d?.message || "Something went wrong",
      });
    }
  };

  /* ==========================================================
        UI
  ========================================================== */

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen">
      <RetailerSidebar />

      <main className="ml-0 lg:ml-64 p-8 w-full">
        <h2 className="text-3xl font-bold text-[#343A40] mb-6">
          Add New Product
        </h2>

        {/* General error */}
        {errors.general && (
          <p className="text-red-600 mb-4 font-semibold bg-red-100 p-3 rounded">
            {errors.general}
          </p>
        )}

        {/* Success message */}
        {successMessage && (
          <p className="text-green-700 mb-4 font-semibold bg-green-100 p-3 rounded">
            {successMessage}
          </p>
        )}

        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-xl border border-[#D4EDDA] max-w-4xl"
        >
          {/* --- INPUT FIELDS --- */}
          {[
            "name",
            "description",
            "price",
            "cost_price",
            "mrp",
            "discount",
            "stock",
            "sku",
            "unit",
            "brand",
            "tax_rate",
            "manufacture_date",
            "expiry_date",
            "weight",
          ].map((key) => (
            <div key={key} className="flex flex-col">
              <label className="font-semibold text-[#343A40]">
                {key.replace("_", " ").toUpperCase()}
              </label>
              <input
                name={key}
                type={key.includes("date") ? "date" : "text"}
                value={data[key]}
                onChange={onChange}
                className="p-3 border rounded-lg w-full mt-1 bg-[#F1F3F5] focus:ring-2 focus:ring-[#28A745] outline-none transition"
              />
              {errors[key] && (
                <span className="text-red-600 text-sm">{errors[key]}</span>
              )}
            </div>
          ))}

          {/* --- CATEGORY DROPDOWN --- */}
          <div className="md:col-span-2">
            <label className="font-semibold text-[#343A40]">
              Select Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={(e) => {
                const id = e.target.value;
                const cat = categories.find((c) => c._id === id);

                setData({
                  ...data,
                  category: id,
                  category_name: cat?.name || "",
                });
              }}
              className="p-3 border rounded-lg w-full mt-1 bg-[#F1F3F5] focus:ring-2 focus:ring-[#28A745] outline-none transition"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className="text-red-600 text-sm">{errors.category}</span>
            )}
          </div>

          {/* --- IMAGE UPLOAD --- */}
          <div className="md:col-span-2">
            <label className="font-semibold text-[#343A40]">
              Upload Product Image
            </label>

            <input
              type="file"
              onChange={handleImage}
              className="p-3 border rounded-lg w-full mt-1 bg-[#F1F3F5]"
            />

            {errors.image && (
              <span className="text-red-600 text-sm">{errors.image}</span>
            )}

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-32 mt-4 rounded-lg shadow border"
              />
            )}
          </div>

          {/* --- SUBMIT BUTTON --- */}
          <button
            type="submit"
            className="p-3 bg-[#28A745] hover:bg-[#218838] text-white rounded-xl md:col-span-2 transition font-semibold"
          >
            Add Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default RetailerAddProduct;
