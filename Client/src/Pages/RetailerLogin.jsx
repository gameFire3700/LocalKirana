// src/pages/retailer/RetailerLogin.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image1 from "../assets/images/login_background.jpg";
import { Store } from "lucide-react";
import { retailerLogin } from "../api/retailerApi";
import { useNavigate } from "react-router-dom";

const RetailerLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- FORM VALIDATION ---------------- */
  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT HANDLER ---------------- */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await retailerLogin(form);

      const token = res.data?.token || res.data?.accessToken;

      if (token) {
        localStorage.setItem("retailerToken", token);

        if (res.data?.retailer?.id) {
          localStorage.setItem("retailerID", res.data.retailer.id);
        }

        window.dispatchEvent(new Event("authChanged"));

        navigate("/retailer/dashboard");
      } else {
        setErrors({ general: "Login successful but token not returned" });
      }
    } catch (err) {
      const data = err.response?.data;
      setErrors({ general: data?.message || "Login failed" });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${Image1})` }}
      className="flex items-center justify-center min-h-screen bg-center bg-cover relative"
    >
      <div className="absolute inset-0 bg-[#F5FFF8]/40 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-[430px] bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl border border-[#A3D9A5]"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="bg-gradient-to-r from-[#28A745] to-[#FF7A00] p-4 rounded-full shadow-sm mb-3">
            <Store size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#2E8B57]">Retailer Login</h2>
        </div>

        {errors.general && (
          <p className="text-red-600 text-center font-medium mb-2">
            {errors.general}
          </p>
        )}

        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border-b-2 border-[#A3D9A5] outline-none"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-3 bg-gradient-to-r from-[#28A745] to-[#FF7A00] text-white rounded-full text-lg font-semibold"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RetailerLogin;
