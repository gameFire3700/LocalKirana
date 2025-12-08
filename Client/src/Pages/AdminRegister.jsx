import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image1 from "../assets/images/login_background.jpg";
import { registerAdmin } from "../api/adminApi";

const AdminRegister = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "Admin",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone number must be 10 digits";

    if (!form.password.trim())
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await registerAdmin(form);

      if (res.data?.success) {
        setSuccessMsg("Admin Registered Successfully!");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 1200);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setErrors({ general: msg });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover relative"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-[420px] bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl border border-[#70C78D] z-10"
      >
        <div className="flex flex-col items-center mb-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#28A745] p-4 rounded-full shadow-md mb-3"
          >
            <ShieldCheck size={34} className="text-white" />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-[#1E7A38]">
            Admin Registration
          </h2>
        </div>

        {errors.general && (
          <p className="text-red-600 text-center mb-2">{errors.general}</p>
        )}

        {successMsg && (
          <p className="text-green-600 text-center mb-2">{successMsg}</p>
        )}

        <motion.form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <input
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#28A745] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.full_name}</p>
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              placeholder="Email Address"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#28A745] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.email}</p>
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              placeholder="Phone Number (10 digits)"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#28A745] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.phone}</p>
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#28A745] outline-none"
            />
            <p className="text-red-600 text-sm">{errors.password}</p>
          </div>

          {/* Role */}
          <div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#28A745] outline-none bg-transparent"
            >
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-3 bg-[#28A745] text-white rounded-full text-lg font-semibold shadow-md"
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
