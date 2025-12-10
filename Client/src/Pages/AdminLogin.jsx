import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Image1 from "../assets/images/login_background.jpg";
import { loginAdmin } from "../api/adminApi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginAdmin(form);
      localStorage.setItem("adminToken", res.data.token);

      setSuccessMsg("Login Successful!");

      setTimeout(() => {
        navigate("/admin/dashboard");  // ✅ Redirect using React Router
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
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
            <Shield size={34} className="text-white" />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-[#1E7A38]">
            Admin Login
          </h2>
        </div>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {successMsg && (
          <p className="text-green-600 text-center mb-2">{successMsg}</p>
        )}

        <motion.form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border-b-2 border-[#28A745] outline-none"
            />
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
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full p-3 bg-[#28A745] text-white rounded-full text-lg font-semibold shadow-md"
          >
            Login
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
