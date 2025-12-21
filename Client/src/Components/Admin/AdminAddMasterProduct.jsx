import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, PlusCircle, Layers, Tag, Box } from "lucide-react";
import axiosClient from "../../api/axiosClient";

const BASE_URL = "http://localhost:5000";

const AdminAddMasterProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: "",
    unit: "",
    weight_value: "",
    weight_unit: "gm",
    length: "",
    width: "",
    height: "",
    is_returnable: true,
    warranty_period: ""
  });

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ FIXED ROUTE HERE
  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get(`${BASE_URL}/category`);
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

  /* ================= SUBCATEGORY ROUTE ================= */
  // GET /subcategories/by-category/:categoryId
  const fetchSubCats = async (categoryId) => {
    if (!categoryId) return;
    try {
      const res = await axiosClient.get(
        `${BASE_URL}/subcategories/by-category/${categoryId}`
      );
      setSubcategories(res?.data?.data || []);
    } catch (err) {
      console.error("Subcategory fetch error", err);
      setSubcategories([]);
    }
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosClient.post(`${BASE_URL}/product-master/create`, {
        ...form,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim())
          : [],
        weight: {
          value: form.weight_value,
          unit: form.weight_unit
        },
        dimensions: {
          length: form.length,
          width: form.width,
          height: form.height
        }
      });

      alert("✅ Product Master Created Successfully");
      window.location.reload();
    } catch (err) {
      alert("❌ Failed to create product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-xl bg-green-600 text-white shadow">
          <Package size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Add Product Master
        </h1>
      </div>

      {/* FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* BASIC INFO */}
        <Section title="Basic Information" icon={<Layers />}>
          <Input label="SKU" name="sku" value={form.sku} onChange={handleChange} />
          <Input
            label="Product Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Section>

        {/* CATEGORY */}
        <Section title="Category Mapping" icon={<Box />}>
          <Select
            label="Category *"
            value={form.category}
            onChange={(e) => {
              const categoryId = e.target.value;
              setForm({ ...form, category: categoryId, subcategory: "" });
              fetchSubCats(categoryId);
            }}
            options={categories}
          />

          <Select
            label="Sub Category *"
            value={form.subcategory}
            onChange={(e) =>
              setForm({ ...form, subcategory: e.target.value })
            }
            options={subcategories}
          />
        </Section>

        {/* PRODUCT DETAILS */}
        <Section title="Product Details">
          <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} />
          <Input label="Unit" name="unit" value={form.unit} onChange={handleChange} />
        </Section>

        {/* WEIGHT */}
        <Section title="Weight & Dimensions">
          <div>
            <label className="label">Weight</label>
            <div className="flex gap-3">
              <input
                type="number"
                className="input"
                placeholder="Value"
                value={form.weight_value}
                onChange={(e) =>
                  setForm({ ...form, weight_value: e.target.value })
                }
              />
              <select
                className="input"
                value={form.weight_unit}
                onChange={(e) =>
                  setForm({ ...form, weight_unit: e.target.value })
                }
              >
                <option value="gm">gm</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="liter">liter</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Dimensions (L × W × H)</label>
            <div className="grid grid-cols-3 gap-3">
              <input className="input" placeholder="L" onChange={(e)=>setForm({...form,length:e.target.value})}/>
              <input className="input" placeholder="W" onChange={(e)=>setForm({...form,width:e.target.value})}/>
              <input className="input" placeholder="H" onChange={(e)=>setForm({...form,height:e.target.value})}/>
            </div>
          </div>
        </Section>

        {/* ADDITIONAL */}
        <Section title="Additional Information" icon={<Tag />} full>
          <Input
            label="Tags (comma separated)"
            name="tags"
            value={form.tags}
            onChange={handleChange}
          />
          <Input
            label="Warranty Period"
            name="warranty_period"
            value={form.warranty_period}
            onChange={handleChange}
          />
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              className="input h-28"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </Section>

        {/* RETURNABLE */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.is_returnable}
            onChange={(e)=>setForm({...form,is_returnable:e.target.checked})}
            className="w-5 h-5"
          />
          <span className="font-semibold text-gray-700">Returnable</span>
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button
            disabled={loading}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition"
          >
            <PlusCircle />
            {loading ? "Saving..." : "Create Product"}
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {children}
    </div>
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

export default AdminAddMasterProduct;
