import React, { useState } from "react";
import { motion } from "framer-motion";
import Image1 from "../assets/images/login_background.jpg";
import { ShoppingBag, Star } from "lucide-react";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover relative"
      style={{
        backgroundImage: `url(${Image1})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#F5FFF8] bg-opacity-40 backdrop-blur-sm"></div>

      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-[420px] bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl border border-[#A3D9A5] z-10 overflow-hidden"
      >
        {/* Decorative Glow */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute w-72 h-72 bg-gradient-to-r from-[#28A745]/30 to-[#FF7A00]/30 rounded-full blur-3xl -top-10 -left-10 z-0"
        ></motion.div>

        {/* Header */}
        <div className="relative flex flex-col items-center mb-4 z-10">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#28A745] to-[#FF7A00] p-4 rounded-full shadow-md mb-3"
          >
            <ShoppingBag size={34} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-[#2E8B57] mb-1">
            {isLoginMode ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-gray-600 text-sm">
            {isLoginMode
              ? "Login to continue shopping at Local Kirana"
              : "Join Local Kirana — Your Trusted Digital Store"}
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="relative flex h-12 mb-6 border border-[#A3D9A5] rounded-full overflow-hidden z-10">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              isLoginMode ? "text-white" : "text-[#333]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 text-lg font-medium transition-all z-10 ${
              !isLoginMode ? "text-white" : "text-[#333]"
            }`}
          >
            Sign Up
          </button>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-[#28A745] to-[#FF7A00] ${
              isLoginMode ? "left-0" : "left-1/2"
            }`}
          ></motion.div>
        </div>

        {/* Form */}
        <motion.form
          key={isLoginMode ? "login" : "signup"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5 z-10 relative"
        >
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-3 border-b-2 border-[#A3D9A5] bg-transparent outline-none focus:border-[#FF7A00] placeholder-gray-500 transition-all"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border-b-2 border-[#A3D9A5] bg-transparent outline-none focus:border-[#FF7A00] placeholder-gray-500 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border-b-2 border-[#A3D9A5] bg-transparent outline-none focus:border-[#FF7A00] placeholder-gray-500 transition-all"
          />

          {!isLoginMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full p-3 border-b-2 border-[#A3D9A5] bg-transparent outline-none focus:border-[#FF7A00] placeholder-gray-500 transition-all"
            />
          )}

          {isLoginMode && (
            <div className="text-right">
              <p className="text-[#2E8B57] hover:underline cursor-pointer text-sm">
                Forgot Password?
              </p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-[#28A745] to-[#FF7A00] text-white rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </motion.button>

          <p className="text-center text-[#333] text-sm">
            {isLoginMode
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-[#FF7A00] font-medium hover:underline cursor-pointer"
            >
              {isLoginMode ? "Sign Up Now" : "Login"}
            </span>
          </p>
        </motion.form>

        
      </motion.div>
    </div>
  );
};

export default Login;
