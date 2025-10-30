import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Store, MessageCircle } from "lucide-react";
import ContactImage from "../assets/images/contact-us.jpg"; // Optional - add a nice image

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#F0FFF0] text-gray-800">
      {/* Header Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-center px-10 py-16 bg-gradient-to-r from-[#28A745] to-[#FF6200] text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Get in Touch with <span className="text-[#F9FFEF]">Local Kirana</span>
          </h1>
          <p className="text-lg leading-relaxed">
            We’re always here to help! Whether you have a question, feedback, or
            partnership idea — let’s connect and make shopping local even better.
          </p>
        </motion.div>

        <motion.img
          src={ContactImage}
          alt="Contact Local Kirana"
          className="w-80 md:w-[400px] rounded-2xl mt-8 md:mt-0 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Contact Details Section */}
      <section className="py-16 px-6 md:px-16 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#28A745] mb-6"
        >
          Contact Information
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto text-gray-600 text-lg mb-10"
        >
          Our team is ready to assist you. Reach out through any of the options below
          and we’ll respond as soon as possible.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Phone className="w-10 h-10 text-[#28A745]" />,
              title: "Phone",
              desc: "+91 98765 43210",
            },
            {
              icon: <Mail className="w-10 h-10 text-[#28A745]" />,
              title: "Email",
              desc: "support@localkirana.com",
            },
            {
              icon: <MapPin className="w-10 h-10 text-[#28A745]" />,
              title: "Address",
              desc: "123 Local Street, New Delhi, India",
            },
          ].map((contact, i) => (
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
                <div className="bg-[#28A745]/10 p-4 rounded-full">{contact.icon}</div>
              </div>
              <h4 className="text-xl font-semibold text-[#28A745] mb-2">
                {contact.title}
              </h4>
              <p className="text-gray-700">{contact.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 bg-[#F0FFF0] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#28A745] mb-6"
        >
          Send Us a Message
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-gray-600 mb-8"
        >
          Have a question or suggestion? Fill out the form below — we’d love to
          hear from you!
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-[#28A745]/20 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28A745] outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28A745] outline-none"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28A745] outline-none"
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28A745] outline-none resize-none"
            required
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-gradient-to-r from-[#28A745] to-[#FF6200] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
            type="submit"
          >
            Send Message
          </motion.button>
        </motion.form>
      </section>

      {/* Operating Hours Section */}
      <section className="py-12 px-6 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-[#28A745] mb-6"
        >
          Business Hours
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto bg-[#F0FFF0] p-6 rounded-xl shadow-md border border-[#28A745]/20"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className="text-[#28A745]" size={22} />
            <p className="text-gray-700 font-medium">Monday - Saturday</p>
          </div>
          <p className="text-[#28A745] font-semibold text-lg">9:00 AM - 9:00 PM</p>
          <p className="text-gray-500 mt-2">Sunday: Closed</p>
        </motion.div>
      </section>

      
    </div>
  );
};

export default ContactUs;
