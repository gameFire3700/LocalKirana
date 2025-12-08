import React, { useState } from "react";
import { motion } from "framer-motion";
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

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await retailerLogin(form);
      const token = res.data?.token || res.data?.accessToken;
      if (token) {
        localStorage.setItem("retailerToken", token);
        if (res.data?.retailer?.id) localStorage.setItem("retailerID", res.data.retailer.id);
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
    <div className="flex items-center justify-center min-h-screen bg-[#F5FFF8]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[430px] bg-white rounded-2xl shadow-xl border border-[#28A745] p-8 flex flex-col items-center"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#28A745] p-4 rounded-full mb-3 shadow">
            <Store size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#28A745]">Retailer Login</h2>
        </div>

        {errors.general && <p className="text-red-600 mb-3">{errors.general}</p>}

        <form className="w-full flex flex-col gap-5" onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border-b-2 border-[#28A745] outline-none"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border-b-2 border-[#28A745] outline-none"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-3 bg-[#28A745] text-white rounded-xl font-semibold shadow-md"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RetailerLogin;
