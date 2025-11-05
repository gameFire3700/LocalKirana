import React from "react";
import { motion } from "framer-motion";
import { Store, Truck, Tag, Smile, Users } from "lucide-react";
import TeamImage from "../assets/images/team.jpg"; // Optional: add a real image
import ShopImage from "../assets/images/shop.jpg"; // Optional: add a local kirana image

const AboutUs = () => { 
  return (
    <div className="min-h-screen bg-[#F0FFF0] text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-center px-10 py-16 bg-gradient-to-r from-[#28A745] to-[#FF6200] text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            About <span className="text-[#F9FFEF]">Local Kirana</span>
          </h1>
          <p className="text-lg leading-relaxed">
            We’re India’s No.1 digital Kirana brand — blending traditional trust
            with modern technology to bring your neighborhood store experience
            online. Our mission is simple: empower local sellers and deliver
            fresh, affordable essentials right to your doorstep.
          </p>
        </motion.div>

        <motion.img
          src={ShopImage}
          alt="Local Kirana Shop"
          className="w-80 md:w-[400px] rounded-2xl mt-8 md:mt-0 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6 md:px-16 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#28A745] mb-6"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto text-gray-600 leading-relaxed text-lg"
        >
          Local Kirana was born from a vision to uplift small shopkeepers and
          make local shopping digital. We bridge the gap between customers who
          value personal service and shopkeepers who deserve growth in the
          modern era. From grains to groceries, every product you order supports
          a hardworking local business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <img
            src={TeamImage}
            alt="Our Team"
            className="rounded-2xl w-[600px] shadow-lg border-4 border-[#28A745]/20"
          />
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-[#F0FFF0] text-center">
        <h2 className="text-4xl font-bold text-[#28A745] mb-10">Our Core Values</h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <Store className="w-10 h-10 text-[#28A745]" />,
              title: "Empowering Local Stores",
              desc: "We partner with small Kirana shops, helping them grow digitally while keeping their neighborhood charm alive."
            },
            {
              icon: <Truck className="w-10 h-10 text-[#28A745]" />,
              title: "Fast & Reliable Delivery",
              desc: "Your essentials, delivered fresh and on time — because we value your time as much as you do."
            },
            {
              icon: <Tag className="w-10 h-10 text-[#28A745]" />,
              title: "Affordable Everyday Prices",
              desc: "Quality products at local prices — making everyday shopping lighter on your pocket."
            },
            {
              icon: <Users className="w-10 h-10 text-[#28A745]" />,
              title: "Community First",
              desc: "We believe in people over profit. Every purchase supports small families and strengthens your local economy."
            },
            {
              icon: <Smile className="w-10 h-10 text-[#28A745]" />,
              title: "Customer Happiness",
              desc: "Your satisfaction is our top priority — with 24/7 support and a hassle-free shopping experience."
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-[#28A745]/20 hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#28A745]/10 p-4 rounded-full">{value.icon}</div>
              </div>
              <h4 className="text-xl font-semibold text-[#28A745] mb-2">{value.title}</h4>
              <p className="text-gray-700 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-8 bg-gradient-to-r from-[#D4EDDA] to-[#F0FFF0] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#28A745] mb-6"
        >
          Our Vision
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed"
        >
          To make every Kirana shop in India digitally empowered and reachable to
          every doorstep — ensuring convenience, quality, and trust for every
          household.
        </motion.p>
      </section>

      
    </div>
  );
};

export default AboutUs;
