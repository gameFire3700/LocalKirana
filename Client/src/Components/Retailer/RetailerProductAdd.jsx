import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, PlusCircle, Layers, Box, Tag, ImageIcon } from "lucide-react";

import { requestAddProduct } from "../../api/retailerApi";
import {
  getCategories,
  getSubCategories,
  getProductMasters
} from "../../api/adminApi";

const RetailerProductAdd = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productMasters, setProductMasters] = useState([]);

  const [selectedMaster, setSelectedMaster] = useState(null);

  const [form, setForm] = useState({
    product_master: "",
    category: "",
    subcategory: "",
    brand: "",
    product_name: "",
    price: 0,
    mrp: 0,
    stock: 0,
    image: null
  });

  /* ================= FETCH INITIAL DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await getCategories();
        const productsRes = await getProductMasters();

        setCategories(categoriesRes.data?.data || []);
        setProductMasters(productsRes.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /* ================= FETCH SUBCATEGORIES ================= */
  useEffect(() => {
    if (!form.category) {
      setSubcategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await getSubCategories(form.category);
        setSubcategories(res.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubCategories();
  }, [form.category]);

  /* ================= PRODUCT MASTER CHANGE ================= */
  const handleProductMasterChange = (e) => {
    const id = e.target.value;
    const master = productMasters.find((p) => p._id === id);

    setSelectedMaster(master || null);

    setForm((prev) => ({
      ...prev,
      product_master: id,
      brand: master?.brand || "",
      product_name: master?.name || ""
    }));
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let val = type === "file" ? files[0] : value;

    // ✅ Prevent negative numbers for price, mrp, stock
    if (type === "number") {
      if (val === "") val = 0;
      else if (Number(val) < 0) val = 0;
    }

    setForm((prev) => ({
      ...prev,
      [name]: val
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
          formData.append(key, form[key]);
        }
      });

      await requestAddProduct(formData);
      alert("✅ Retailer Product added successfully!");
      navigate("/retailer/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-xl bg-green-600 text-white shadow">
          <Package size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Add Retailer Product
        </h1>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        encType="multipart/form-data"
      >
        {/* PRODUCT MASTER */}
        <Section title="Product Master" icon={<Layers />}>
          <Select
            label="Product Master *"
            value={form.product_master}
            onChange={handleProductMasterChange}
            options={productMasters}
          />
        </Section>

        {/* PRODUCT MASTER PREVIEW */}
        {selectedMaster && (
          <Section title="Product Details (From Master)" icon={<Tag />}>
            <Input label="Product Name" value={form.product_name} readOnly />
            <Input label="Brand" value={form.brand} readOnly />
          </Section>
        )}

        {/* CATEGORY */}
        <Section title="Category Mapping" icon={<Box />}>
          <Select
            label="Category *"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
                subcategory: ""
              })
            }
            options={categories}
          />

          <Select
            label="Subcategory *"
            value={form.subcategory}
            onChange={(e) =>
              setForm({ ...form, subcategory: e.target.value })
            }
            options={subcategories}
          />
        </Section>

        {/* PRICING */}
        <Section title="Pricing & Stock" icon={<Tag />}>
          <Input
            label="Price *"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
          <Input
            label="MRP"
            type="number"
            name="mrp"
            value={form.mrp}
            onChange={handleChange}
          />
          <Input
            label="Stock *"
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </Section>

        {/* IMAGE */}
        <Section title="Product Image" icon={<ImageIcon />}>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="input"
          />
        </Section>

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-14 rounded-xl flex items-center justify-center gap-3
              ${loading ? "bg-gray-400" : "bg-green-600 text-white"}`}
          >
            <PlusCircle />
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

/* ================= UI COMPONENTS ================= */

const Section = ({ title, icon, children }) => (
  <div className="border rounded-xl p-6 bg-gray-50">
    <h3 className="flex items-center gap-2 font-bold mb-4">
      {icon} {title}
    </h3>
    <div className="grid gap-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label>{label}</label>
    <input className="input bg-gray-100" {...props} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label>{label}</label>
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

export default RetailerProductAdd;
