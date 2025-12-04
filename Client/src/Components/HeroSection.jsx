import React from "react";
import { motion } from "framer-motion";
import Banner from "../assets/images/banner.png";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center flex-grow bg-gradient-to-r from-[#28A745] to-[#D4EDDA] text-[#343A40] p-10">
      
      {/* Left Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xl text-center md:text-left md:pr-10"
      >
        <h2 className="text-5xl font-extrabold mb-4 text-white drop-shadow-sm">
          India’s No.1 Kirana Brand  
          <br /> 
          <span className="text-[#2E8B57]">“Apka Apna Store, Digital Roop Mein”</span> 
        </h2>

        <p className="text-lg mb-6 text-[#343A40] font-medium">
          Local savings. Fresh deals. Trustworthy service.
        </p>
      </motion.div>

      {/* Banner Image */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        src={Banner}
        alt="Banner"
        className="w-80 md:w-96 rounded-xl mt-8 md:mt-0 shadow-lg"
      />
    </section>  
  );
};

export default HeroSection;
