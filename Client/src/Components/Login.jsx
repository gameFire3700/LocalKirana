import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image1 from "../assets/images/login_background.jpg";
import { customerLogin, customerSignup } from "../api/authApi";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // -------------------- VALIDATION --------------------
  const validate = () => {
    let newErrors = {};

    if (!isLoginMode) {
      if (!formData.full_name.trim())
        newErrors.full_name = "Full name is required";

      if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone must be 10 digits";

      if (!formData.date_of_birth)
        newErrors.date_of_birth = "Date of birth is required";

      if (!formData.gender)
        newErrors.gender = "Please select a gender";
    }

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    if (!isLoginMode) {
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm password required";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------- INPUT CHANGE --------------------
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------- SUBMIT --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!isLoginMode) {
      try {
        const res = await customerSignup({
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          password: formData.password,
        });

        if (res.data.success) {
          localStorage.setItem("userToken", res.data.token);
          window.dispatchEvent(new Event("authChanged"));
          navigate("/profile");
        }
      } catch (err) {
        setErrors({ email: err.response?.data?.message || "Signup failed" });
      }
      return;
    }

    try {
      const res = await customerLogin({
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        localStorage.setItem("userToken", res.data.token);
        window.dispatchEvent(new Event("authChanged"));
        navigate("/profile");
      }
    } catch (err) {
      setErrors({ email: err.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#28A745]/25 backdrop-blur-sm"></div>

      {/* MAIN CARD */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
        className={`relative ${
          isLoginMode ? "w-[420px] py-8" : "w-[530px] py-6"
        } bg-white/95 px-8 rounded-3xl shadow-2xl border border-[#28A745]/30 z-10 backdrop-blur-xl`}
      >
        {/* ICON */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            whileHover={{ scale: 1.07 }}
            className="bg-[#28A745] p-4 rounded-full shadow-lg cursor-pointer"
          >
            <ShoppingBag size={38} className="text-white" />
          </motion.div>

          <h2 className="text-3xl font-extrabold text-[#28A745] mt-3">
            {isLoginMode ? "Welcome Back!" : "Create Account"}
          </h2>
        </div>

        {/* TOGGLE */}
        <div className="relative flex h-12 mb-6 border border-[#28A745]/50 rounded-full overflow-hidden cursor-pointer">

          <button
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 text-lg font-semibold transition-all z-20 ${
              isLoginMode ? "text-white" : "text-[#28A745]"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 text-lg font-semibold transition-all z-20 ${
              !isLoginMode ? "text-white" : "text-[#28A745]"
            }`}
          >
            Sign Up
          </button>

          <motion.div
            layout
            className={`absolute top-0 h-full w-1/2 rounded-full bg-[#28A745] shadow-md z-10 ${
              isLoginMode ? "left-0" : "left-1/2"
            }`}
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLoginMode && (
            <>
              <InputField
                name="full_name"
                placeholder="Full Name"
                onChange={handleChange}
                error={errors.full_name}
              />

              <InputField
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                error={errors.phone}
              />

              <InputField
                type="date"
                name="date_of_birth"
                onChange={handleChange}
                error={errors.date_of_birth}
              />

              <SelectField
                name="gender"
                onChange={handleChange}
                error={errors.gender}
              />
            </>
          )}

          <InputField
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            error={errors.password}
          />

          {!isLoginMode && (
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          )}

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full p-3 bg-[#28A745] hover:bg-[#28A745]/90 active:bg-[#28A745]/70 text-white rounded-full text-lg font-semibold shadow-lg cursor-pointer transition"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

/* -------------------- INPUT FIELD -------------------- */
const InputField = ({ type = "text", name, placeholder, onChange, error }) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-3 bg-transparent border-b-2 border-[#28A745]/40 focus:border-[#28A745] outline-none transition text-gray-800"
    />
    <p className="text-red-600 text-sm">{error}</p>
  </div>
);

/* -------------------- SELECT FIELD -------------------- */
const SelectField = ({ name, onChange, error }) => (
  <div>
    <select
      name={name}
      onChange={onChange}
      className="w-full p-3 bg-transparent border-b-2 border-[#28A745]/40 focus:border-[#28A745] outline-none"
    >
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
    <p className="text-red-600 text-sm">{error}</p>
  </div>
);

export default Login;
