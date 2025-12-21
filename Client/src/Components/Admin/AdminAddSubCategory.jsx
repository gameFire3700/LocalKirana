import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategories, createSubCategory } from "../../api/adminApi";

const AdminAddSubCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    image_url: "",
    display_order: 0,
    is_active: true
  });

  /* =========================
     FETCH CATEGORIES
  ========================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.data && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("❌ Category Fetch Error:", err);
        alert("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  /* =========================
     HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      return alert("Subcategory name and category are required");
    }
    setLoading(true);
    try {
      await createSubCategory(form);
      alert("✅ SubCategory created successfully");
      navigate("/admin/subcategories");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Error creating subcategory");
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
        <h1 className="text-3xl font-bold text-gray-800">
          Add New SubCategory
        </h1>
      </div>

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label="SubCategory Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Select
            label="Parent Category *"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={categories}
          />
        </Section>

        {/* IMAGE & DISPLAY ORDER */}
        <Section title="Display & Image">
          <Input
            label="Image URL"
            name="image_url"
            placeholder="https://example.com/image.png"
            value={form.image_url}
            onChange={handleChange}
          />
          <Input
            label="Display Order"
            type="number"
            name="display_order"
            value={form.display_order}
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
            onClick={() => navigate("/admin/subcategories")}
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
            {loading ? "Saving..." : "Create SubCategory"}
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

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="label">{label}</label>
    <select className="input" value={value} onChange={onChange}>
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o._id} value={o._id}>
          {o.name}
        </option>
      ))}
    </select>
  </div>
);

export default AdminAddSubCategory;
