import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Tag,
  ShieldCheck,
  ShoppingCart,
  Clock,
  Smile,
  Star,
  Smartphone,
} from "lucide-react";
import FeatureImage from "../assets/images/features.jpg"; // optional image

const Features = () => {
  const featureList = [
    {
      icon: <ShoppingCart className="w-10 h-10 text-[#28A745]" />,
      title: "Wide Range of Products",
      desc: "From daily groceries to household essentials — find everything at your fingertips.",
    },
    {
      icon: <Truck className="w-10 h-10 text-[#28A745]" />,
      title: "Fast & Reliable Delivery",
      desc: "Get your orders delivered quickly and safely from your trusted local kirana stores.",
    },
    {
      icon: <Tag className="w-10 h-10 text-[#28A745]" />,
      title: "Exciting Offers & Discounts",
      desc: "Enjoy exclusive deals, cashback, and festive discounts every day.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#28A745]" />,
      title: "Quality & Trust",
      desc: "Every product is verified for freshness and quality from your local suppliers.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-[#28A745]" />,
      title: "Smart Digital Shopping",
      desc: "Order anytime, anywhere with our easy-to-use digital platform.",
    },
    {
      icon: <Smile className="w-10 h-10 text-[#28A745]" />,
      title: "Customer Satisfaction",
      desc: "We prioritize happy customers — your convenience is our top priority.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0FFF0] text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-10 py-16 bg-gradient-to-r from-[#28A745] to-[#FF6200] text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Why Choose <span className="text-[#F9FFEF]">Local Kirana?</span>
          </h1>
          <p className="text-lg leading-relaxed">
            Discover the future of local shopping — blending traditional kirana trust
            with the power of digital convenience. Your neighborhood store, now online!
          </p>
        </motion.div>

        <motion.img
          src={FeatureImage}
          alt="Local Kirana Features"
          className="w-80 md:w-[420px] rounded-2xl mt-8 md:mt-0 shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#28A745] mb-6"
        >
          Our Key Features
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto text-gray-600 text-lg mb-10"
        >
          At Local Kirana, we’re redefining how India shops locally — making your
          neighborhood stores smarter, faster, and closer than ever before.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featureList.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F0FFF0] p-8 rounded-2xl shadow-md border border-[#28A745]/20 hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#28A745]/10 p-4 rounded-full">{feature.icon}</div>
              </div>
              <h4 className="text-xl font-semibold text-[#28A745] mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rating & Trust Section */}
      <section className="py-12 bg-[#F0FFF0] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-[#28A745] mb-4"
        >
          Loved by Customers Across India 🇮🇳
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-yellow-500 mb-3"
        >
          {Array(5)
            .fill()
            .map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400" />
            ))}
        </motion.div>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Over <span className="text-[#FF6200] font-semibold">1 lakh+</span> happy
          customers trust Local Kirana for their daily essentials.  
          We’re bringing the *heart of local India* online — one order at a time!
        </p>
      </section>

      
    </div>
  );
};

export default Features;
