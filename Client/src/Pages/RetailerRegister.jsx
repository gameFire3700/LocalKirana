import React, { useState } from "react";
import { motion } from "framer-motion";
import { Store } from "lucide-react";
import Image1 from "../assets/images/login_background.jpg";
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

  const generateRetailerId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Retailer name is required";

    // Phone validation
    if (!/^\d{10}$/.test(form.contact))
      newErrors.contact = "Contact number must be 10 digits";

    // Email validation
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Invalid email format";

    // GST validation
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

    if (!form.gst_no.trim()) newErrors.gst_no = "GST number is required";
    else if (!gstRegex.test(form.gst_no))
      newErrors.gst_no = "Invalid GST format";

    // Address
    if (!form.shop_addresses.trim())
      newErrors.shop_addresses = "Shop address is required";

    // Password
    if (!form.password.trim())
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const payload = {
        ...form,
        retailer_id: generateRetailerId(),
      };

      const res = await retailerRegister(payload);

      if (res.status === 201 || res.data?.success) {
        window.location.href = "/retailer/login";
      }
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        const first = Object.values(data.errors)[0];
        setErrors({ general: first || data.message });
      } else {
        setErrors({ general: data?.message || "Registration failed" });
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover relative"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="absolute inset-0 bg-[#F5FFF8] bg-opacity-40 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-[420px] bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl border border-[#A3D9A5] z-10"
      >
        <div className="flex flex-col items-center mb-4">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#28A745] to-[#FF7A00] p-4 rounded-full shadow-md mb-3"
          >
            <Store size={34} className="text-white" />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-[#2E8B57]">
            Retailer Registration
          </h2>
        </div>

        {errors.general && (
          <p className="text-red-600 text-center mb-2">{errors.general}</p>
        )}

        <motion.form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Retailer Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.name}</p>
          </div>

          {/* Contact */}
          <div>
            <input
              name="contact"
              placeholder="10 Digit Contact Number"
              value={form.contact}
              maxLength={10}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.contact}</p>
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.email}</p>
          </div>

          {/* GST */}
          <div>
            <input
              name="gst_no"
              placeholder="GST Number (Valid Format)"
              value={form.gst_no}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.gst_no}</p>
          </div>

          {/* Address */}
          <div>
            <input
              name="shop_addresses"
              placeholder="Shop Address"
              value={form.shop_addresses}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.shop_addresses}</p>
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.password}</p>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-3 bg-gradient-to-r from-[#28A745] to-[#FF7A00] text-white rounded-full text-lg font-semibold shadow-md"
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default RetailerRegister;
