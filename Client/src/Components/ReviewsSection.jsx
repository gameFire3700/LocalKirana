import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    { name: "Ravi Kumar", review: "Fantastic service! My order arrived the same day. Prices are great." },
    { name: "Priya Sharma", review: "Easy search and fast checkout. Local Kirana is awesome!" },
    { name: "Amit Verma", review: "Great quality and customer support. I shop weekly!" },
    { name: "Neha Patel", review: "Delivery always on time — affordable, fast and reliable!" },
  ];

  return (
    <section className="py-12 bg-[#F0FFF0]">
      <h2 className="text-3xl font-bold text-center text-[#28A745] mb-8">
        What Our Customers Say
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {reviews.map((rev, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border border-[#28A745]/20 p-6 rounded-xl shadow-md hover:shadow-xl transition-colors duration-300 hover:bg-[#D4EDDA]/70"
          >
            {/* Stars */}
            <div className="flex justify-center mb-2 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="gold" stroke="none" />
              ))}
            </div>

            <p className="italic text-gray-700 mb-3">"{rev.review}"</p>
            <h4 className="font-semibold text-[#28A745]">{rev.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
