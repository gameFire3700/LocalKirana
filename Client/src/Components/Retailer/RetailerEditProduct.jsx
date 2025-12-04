import React, { useEffect, useState } from "react";
import RetailerSidebar from "./RetailerSidebar";
import { updateProduct, fetchMyProducts } from "../../api/retailerApi";
import axiosClient from "../../api/axiosClient";
import { useParams, useNavigate } from "react-router-dom";

const RetailerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  /* ======================================================
      LOAD CATEGORIES
  ======================================================= */
  const loadCategories = async () => {
    try {
      const res = await axiosClient.get("/category");
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      console.error("Category load error:", err);
    }
  };

  /* ======================================================
      LOAD PRODUCT TO EDIT
  ======================================================= */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchMyProducts();
        const found = res.data.products.find((p) => p._id === id);

        if (!found) {
          alert("Product not found!");
          return navigate("/retailer/products");
        }

        setData({
          ...found,
          category: found.category?._id || found.category,
          category_name: found.category?.name || found.category_name,
        });
      } catch (err) {
        alert("Failed to load product");
      }
    };

    loadCategories();
    load();
  }, [id]);

  if (!data) return null;

  /* ======================================================
      HANDLE INPUT
  ======================================================= */
  const onChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  /* ======================================================
      IMAGE PREVIEW
  ======================================================= */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return alert("Only image files allowed");
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ======================================================
      SAVE PRODUCT
  ======================================================= */
  const save = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(data).forEach((k) => {
      if (!["_id", "__v", "image"].includes(k)) {
        if (data[k] !== undefined && data[k] !== null)
          fd.append(k, data[k]);
      }
    });

    // Force category to always be included
    fd.append("category", data.category);

    if (image) fd.append("image", image);

    try {
      const res = await updateProduct(id, fd);

      alert(res.data?.message || "Product updated successfully!");
      navigate("/retailer/products");
    } catch (err) {
      const d = err.response?.data;
      alert(d?.message || "Update failed");
    }
  };

  return (
    <div className="flex">
      <RetailerSidebar />

      <main className="ml-0 lg:ml-64 p-8 w-full">
        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

        <form
          onSubmit={save}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg max-w-4xl"
        >
          {/* --- PRODUCT NAME --- */}
          <div>
            <label className="font-semibold">Product Name</label>
            <input
              name="name"
              value={data.name}
              onChange={onChange}
              className="p-3 border rounded w-full mt-1"
              placeholder="Enter product name"
            />
          </div>

          {/* --- PRICE --- */}
          <div>
            <label className="font-semibold">Price</label>
            <input
              name="price"
              value={data.price}
              onChange={onChange}
              type="number"
              className="p-3 border rounded w-full mt-1"
            />
          </div>

          {/* --- STOCK --- */}
          <div>
            <label className="font-semibold">Stock</label>
            <input
              name="stock"
              value={data.stock}
              onChange={onChange}
              type="number"
              className="p-3 border rounded w-full mt-1"
            />
          </div>

          {/* --- BRAND --- */}
          <div>
            <label className="font-semibold">Brand</label>
            <input
              name="brand"
              value={data.brand}
              onChange={onChange}
              className="p-3 border rounded w-full mt-1"
              placeholder="Brand name"
            />
          </div>

          {/* --- UNIT --- */}
          <div>
            <label className="font-semibold">Unit</label>
            <input
              name="unit"
              value={data.unit}
              onChange={onChange}
              className="p-3 border rounded w-full mt-1"
              placeholder="e.g. pack, bottle"
            />
          </div>

          {/* --- WEIGHT --- */}
          <div>
            <label className="font-semibold">Weight Type</label>
            <select
              name="weight"
              value={data.weight}
              onChange={onChange}
              className="p-3 border rounded w-full mt-1"
            >
              <option value="">Select Weight</option>
              <option value="gm">Gram (gm)</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="ml">Milliliter (ml)</option>
              <option value="liter">Liter</option>
            </select>
          </div>

          {/* --- CATEGORY --- */}
          <div className="md:col-span-2">
            <label className="font-semibold">Category</label>
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
              className="p-3 border rounded w-full mt-1"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* --- DESCRIPTION --- */}
          <div className="md:col-span-2">
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={onChange}
              className="p-3 border rounded w-full mt-1 h-24 resize-none"
            />
          </div>

          {/* --- IMAGE UPLOAD --- */}
          <div className="md:col-span-2">
            <label className="font-semibold">Product Image</label>

            <input
              type="file"
              onChange={handleImage}
              className="mt-2"
            />

            {/* SHOW IMAGE PREVIEW */}
            {(preview || data.image) && (
              <img
                src={preview || data.image}
                alt="preview"
                className="w-32 mt-3 rounded-lg shadow border"
              />
            )}
          </div>

          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-xl md:col-span-2 hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default RetailerEditProduct;
