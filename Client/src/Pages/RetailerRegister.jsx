import React, { useState } from "react";
import { motion } from "framer-motion";
import { Store } from "lucide-react";
import { retailerRegister } from "../api/retailerApi";

const RetailerRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    gst_no: "",
    shop_addresses: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateRetailerId = () => Math.floor(100000 + Math.random() * 900000);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Retailer name is required";
    if (!/^\d{10}$/.test(form.contact)) newErrors.contact = "Contact must be 10 digits";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Invalid email format";
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
    if (!form.gst_no.trim()) newErrors.gst_no = "GST number is required";
    else if (!gstRegex.test(form.gst_no)) newErrors.gst_no = "Invalid GST format";
    if (!form.shop_addresses.trim()) newErrors.shop_addresses = "Shop address is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = { ...form, retailer_id: generateRetailerId() };
      const res = await retailerRegister(payload);
      if (res.status === 201 || res.data?.success) {
        window.location.href = "/retailer/login";
      }
    } catch (err) {
      const data = err.response?.data;
      setErrors({ general: data?.message || "Registration failed" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5FFF8]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[420px] bg-white rounded-2xl shadow-xl border border-[#28A745] p-8 flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#28A745] p-4 rounded-full mb-3 shadow">
            <Store size={34} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#28A745]">Retailer Registration</h2>
        </div>

        {errors.general && <p className="text-red-600 mb-3">{errors.general}</p>}

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <input name="name" placeholder="Retailer Name" value={form.name} onChange={handleChange} className="w-full p-3 border-b-2 border-[#28A745] outline-none"/>
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <input name="contact" placeholder="10 Digit Contact Number" value={form.contact} maxLength={10} onChange={handleChange} className="w-full p-3 border-b-2 border-[#28A745] outline-none"/>
          {errors.contact && <p className="text-red-600 text-sm">{errors.contact}</p>}

          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full p-3 border-b-2 border-[#28A745] outline-none"/>
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          <input name="gst_no" placeholder="GST Number" value={form.gst_no} onChange={handleChange} className="w-full p-3 border-b-2 border-[#28A745] outline-none"/>
          {errors.gst_no && <p className="text-red-600 text-sm">{errors.gst_no}</p>}

          <input name="shop_addresses" placeholder="Shop Address" value={form.shop_addresses} onChange={handleChange} className="w-full p-3 border-b-2 border-[#28A745] outline-none"/>
          {errors.shop_addresses && <p className="text-red-600 text-sm">{errors.shop_addresses}</p>}

          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 border-b-2 border-[#28A745] outline-none"/>
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

          <motion.button whileHover={{ scale: 1.03 }} className="w-full py-3 bg-[#28A745] text-white rounded-xl font-semibold shadow-md">
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RetailerRegister;
