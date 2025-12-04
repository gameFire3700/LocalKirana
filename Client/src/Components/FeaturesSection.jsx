import React from "react";
import { motion } from "framer-motion";
import { Tag, Truck, Smile, ShoppingCart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Tag className="w-8 h-8 text-[#28A745]" />,
      title: "Discounted Prices",
      desc: "Unbeatable prices on your favorite items — and yes, you can still bargain!",
    },
    {
      icon: <Truck className="w-8 h-8 text-[#28A745]" />,
      title: "Fast Delivery",
      desc: "Your daily essentials, delivered right to your door — always on time.",
    },
    {
      icon: <Smile className="w-8 h-8 text-[#28A745]" />,
      title: "Verified Seller",
      desc: "Join thousands of happy shoppers who trust Local Kirana every day.",
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-[#28A745]" />,
      title: "Support Local Kirana",
      desc: "Boost your local shop owners and support the economy.",
    },
  ];

  return (
    <section className="py-12 bg-[#F0FFF0]">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-[#28A745] mb-4">
          Why Choose Local Kirana?
        </h3>
        <p className="text-lg mb-6 text-[#343A40] font-medium">
          We blend the charm of your local store with the convenience of modern shopping.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-[#28A745]/20 p-6 rounded-xl shadow-md hover:shadow-xl transition-colors duration-300 hover:bg-[#D4EDDA]/70"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-[#28A745]/10 to-[#FF6200]/10 p-4 rounded-full">
                  {f.icon}
                </div>
              </div>
              <h4 className="text-2xl font-semibold mb-2 text-[#28A745]">
                {f.title}
              </h4>
              <p className="text-gray-700 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
