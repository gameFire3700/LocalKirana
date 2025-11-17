import React, { useEffect, useState } from "react";
import Image from "../assets/images/banner.png";
import { motion } from "framer-motion";
import { Tag, Truck, Smile, ShoppingCart, Star } from "lucide-react";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    let productList = [];
    if (savedProducts) {
      productList = JSON.parse(savedProducts);
    } else {
      productList = [
        { id: 1, name: "Rice", category: "Grains", price: 500, stock: 10, imagePreview: "" },
        { id: 2, name: "Sugar", category: "Sweeteners", price: 40, stock: 20, imagePreview: "" },
        { id: 3, name: "Oil", category: "Cooking", price: 150, stock: 5, imagePreview: "" },
      ];
      localStorage.setItem("products", JSON.stringify(productList));
    }
    setProducts(productList);
    setFiltered(productList);
  }, []);

  useEffect(() => {
    const handleSearch = (e) => {
      const query = e.detail.toLowerCase();
      if (!query) {
        setFiltered(products);
      } else {
        const matched = products.filter((p) =>
          p.name.toLowerCase().includes(query)
        );
        setFiltered(matched);
      }
    };
    window.addEventListener("product-search", handleSearch);
    return () => window.removeEventListener("product-search", handleSearch);
  }, [products]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-grow bg-gradient-to-r from-[#28A745] to-[#D4EDDA] text-[#343A40] p-10">
        <div className="max-w-xl text-center md:text-left md:pr-10">
          <h2 className="text-5xl font-extrabold mb-4 text-white drop-shadow-sm">
            India’s No.1 Kirana Brand ~ “Apka Apna Store, Digital Roop Mein”
          </h2>
          <p className="text-lg mb-6 text-[#343A40] font-medium">
            Local savings. Fresh deals. Trustworthy service.
          </p>
        </div>
        <img src={Image} className="w-80 md:w-96 rounded-xl mt-8 md:mt-0" alt="Banner" />
      </section>

 


      {/* Products Section */}
      <section className="p-6 bg-[#F0FFF0]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#28A745]">
          {filtered.length === products.length ? "Available Products" : "Search Results"}
        </h2>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No matching products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition overflow-hidden w-[260px] mx-auto"
              >
                {product.imagePreview && (
                  <img
                    src={product.imagePreview}
                    alt={product.name}
                    className="w-full h-44 object-contain p-2 bg-[#f8f8f8]"
                  />
                )}

                <div className="p-4 flex flex-col gap-1.5">
                  <h3 className="text-md font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[#28A745] font-bold text-sm">₹{product.price}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  {product.stock > 0 && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => addToCart(product)}
                      className="mt-2 w-full bg-gradient-to-r from-[#28A745] to-[#FF6200] text-white py-2 rounded-full flex items-center justify-center gap-1 text-sm font-medium hover:opacity-90 transition cursor-pointer"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

    {/* Features Section */}
<section className="py-12 bg-[#F0FFF0]">
  <div className="max-w-7xl mx-auto text-center">
    <h3 className="text-4xl font-bold text-[#28A745] mb-4">
      Why Choose Local Kirana?
    </h3>
    <p className="text-lg mb-6 text-[#343A40] font-medium">
      We blend the charm of your local store with the convenience of modern shopping — reliable, fast, and friendly.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { icon: <Tag className="w-8 h-8 text-[#28A745]" />, title: "Discounted Prices", desc: "Unbeatable prices on your favorite items — and yes, you can still bargain!" },
        { icon: <Truck className="w-8 h-8 text-[#28A745]" />, title: "Fast Delivery", desc: "Your daily essentials, delivered right to your door — always on time." },
        { icon: <Smile className="w-8 h-8 text-[#28A745]" />, title: "Verified Seller", desc: "Join thousands of happy shoppers who trust Local Kirana every day." },
        { icon: <ShoppingCart className="w-8 h-8 text-[#28A745]" />, title: "Support Your Local Kirana", desc: "Encourage your neighborhood stores and boost the local economy by shopping with us." },
      ].map((feature, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-[#28A745]/20 p-6 rounded-xl shadow-md hover:shadow-xl transition-colors duration-300 hover:bg-[#D4EDDA]/70"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-[#28A745]/10 to-[#FF6200]/10 p-4 rounded-full">
              {feature.icon}
            </div>
          </div>
          <h4 className="text-2xl font-semibold mb-2 text-[#28A745]">{feature.title}</h4>
          <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>



       {/* Customer Reviews Section */}
<section className="py-12 bg-[#F0FFF0]">
  <h2 className="text-3xl font-bold text-center text-[#28A745] mb-8">
    What Our Customers Say
  </h2>
  <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
    {[
      { name: "Ravi Kumar", review: "Fantastic service! My order arrived the same day. Prices are much better than local shops." },
      { name: "Priya Sharma", review: "I love the easy search and fast checkout. Local Kirana never disappoints!" },
      { name: "Amit Verma", review: "Great quality and customer support. I shop here every week!" },
      { name: "Neha Patel", review: "Their delivery service is always on time — 10/10 experience!" },
    ].map((rev, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white border border-[#28A745]/20 p-6 rounded-xl shadow-md hover:shadow-xl transition-colors duration-300 hover:bg-[#D4EDDA]/70"
      >
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

    </div>
  );
};

// Feature card
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="p-8 bg-white border border-[#28A745]/30 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
  >
    <div className="flex justify-center mb-4">
      <div className="bg-gradient-to-r from-[#28A745]/10 to-[#FF6200]/10 p-4 rounded-full">
        {icon}
      </div>
    </div>
    <h4 className="text-2xl font-semibold mb-2 text-[#28A745]">{title}</h4>
    <p className="text-gray-700 leading-relaxed">{desc}</p>
  </motion.div>
);

export default LandingPage;
