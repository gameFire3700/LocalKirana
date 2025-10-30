import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Image1 from "../assets/images/Logo.png";
import IndiaFlag from "../assets/images/india-flag.png";

const Footer = () => (
  <footer className="bg-[#28A745] text-white mt-auto">
    
    {/* Animated Footer Message */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="py-8 text-center"
    >
      <p className="text-lg font-medium">
        🌾 Local Kirana — “Apka Apna Store, Digital Roop Mein!”
      </p>
    </motion.div>

    {/* Main Footer Section */}
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

      {/* About Section */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <img src={Image1} alt="Logo" className="w-10 rounded-lg" />
          <h1 className="text-xl font-bold text-white tracking-wide">
            Local Kirana
          </h1>
        </div>
        <p className="text-[#D4EDDA]/90 mb-2">
          Trusted local Kirana store connecting you with fresh products and great deals.
        </p>
        <p className="font-semibold text-white flex items-center gap-2">
          <img src={IndiaFlag} alt="India Flag" className="w-5 h-3 object-cover" /> Local for Vocal
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link to="/aboutus" className="hover:text-[#FF6200] transition">About Us</Link></li>
          <li><Link to="/features" className="hover:text-[#FF6200] transition">Features</Link></li>
          <li><Link to="/contact" className="hover:text-[#FF6200] transition">Contact Us</Link></li>
          <li><Link to="/login" className="hover:text-[#FF6200] transition">Login / Register</Link></li>
        </ul>
      </div>

      {/* Contact & Social Links */}
      <div>
        <h4 className="text-xl font-bold mb-4 text-white">Contact & Follow Us</h4>
        <p className="text-[#D4EDDA]/90">📍 123 Local, India</p>
        <p className="text-[#D4EDDA]/90">📞 +91 98765 43210</p>
        <p className="text-[#D4EDDA]/90 mb-4">✉️ support@localkirana.com</p>

        <div className="flex gap-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="bg-white text-[#3b5998] p-2 rounded-full hover:scale-110 transition duration-300">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="bg-white text-[#E1306C] p-2 rounded-full hover:scale-110 transition duration-300">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className="bg-white text-[#0077b5] p-2 rounded-full hover:scale-110 transition duration-300">
            <FaLinkedinIn />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
             className="bg-white text-[#1DA1F2] p-2 rounded-full hover:scale-110 transition duration-300">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Copyright */}
    <div className="bg-[#1F5C34] text-[#D4EDDA] text-center py-4 mt-6">
      &copy; {new Date().getFullYear()} Local Kirana. All rights reserved.
    </div>
  </footer>
);

export default Footer;
