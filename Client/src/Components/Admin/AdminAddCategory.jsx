import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Box, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const AdminAddCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null, // ✅ now file
    display_order: 0,
    is_active: true,
    meta_title: "",
    meta_description: "",
    meta_keywords: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null) {
          // ✅ For meta_keywords, convert string to array
          if (key === "meta_keywords") {
            formData.append(
              key,
              JSON.stringify(
                form[key] ? form[key].split(",").map((k) => k.trim()) : []
              )
            );
          } else {
            formData.append(key, form[key]);
          }
        }
      });

      await axiosClient.post("/category/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✅ Category created successfully");
      navigate("/admin/category/create");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Error creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-xl bg-green-600 text-white shadow">
          <Box size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Add New Category</h1>
      </div>

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        encType="multipart/form-data" // ✅ important
      >
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label="Category Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              className="input h-24"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </Section>

        {/* IMAGE & DISPLAY ORDER */}
        <Section title="Display & Image">
          <div>
            <label className="label">Category Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="input"
            />
            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="preview"
                className="mt-2 h-28 object-contain"
              />
            )}
          </div>
          <Input
            label="Display Order"
            type="number"
            name="display_order"
            value={form.display_order}
            onChange={handleChange}
          />
        </Section>

        {/* SEO INFO */}
        <Section title="SEO Information" icon={<Tag />} full>
          <Input
            label="Meta Title"
            name="meta_title"
            value={form.meta_title}
            onChange={handleChange}
          />
          <div className="md:col-span-2">
            <label className="label">Meta Description</label>
            <textarea
              className="input h-20"
              name="meta_description"
              value={form.meta_description}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Meta Keywords (comma separated)"
            name="meta_keywords"
            value={form.meta_keywords}
            onChange={handleChange}
          />
        </Section>

        {/* ACTIVE */}
        <div className="flex items-center gap-3 md:col-span-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            className="w-5 h-5"
          />
          <span className="font-semibold text-gray-700">Active</span>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 md:col-span-2">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="w-full h-14 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold text-lg transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition"
          >
            <PlusCircle />
            {loading ? "Saving..." : "Create Category"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ title, icon, children, full }) => (
  <div className={`${full ? "md:col-span-2" : ""} border rounded-xl p-6 bg-gray-50`}>
    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
      {icon} {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input className="input" {...props} />
  </div>
);

export default AdminAddCategory;
