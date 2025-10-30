import React, { useState, useEffect } from "react";
import Image1 from "../assets/images/Logo.png";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("product-search", { detail: searchQuery }));
  };

  const navLinkClasses =
  "relative text-base font-medium text-gray-900 hover:text-[#28A745] transition-all duration-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#28A745] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="w-full bg-white py-2 shadow-sm relative">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={Image1} alt="Logo" className="w-10 rounded-lg" />
          <h1 className="text-xl font-bold text-[#28A745] tracking-wide">Local Kirana</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-50 border border-gray-200 focus-within:border-[#28A745] focus-within:shadow-md rounded-full px-3 py-1.5 transition-all duration-200"
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                window.dispatchEvent(
                  new CustomEvent("product-search", { detail: e.target.value })
                );
              }}
              className="outline-none bg-transparent text-sm text-gray-700 w-48 md:w-64 placeholder-gray-400"
            />
            <button
              type="submit"
              className="ml-2 bg-[#28A745] hover:bg-[#23923E] text-white rounded-full p-1.5 transition-colors duration-200"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Nav Links */}
          <Link to="/" className={navLinkClasses}>
            Home
          </Link>
          <Link to="/login" className={navLinkClasses}>
            Login
          </Link>
          <Link to="/features" className={navLinkClasses}>
            Features
          </Link>
          <Link to="/contact" className={navLinkClasses}>
            Contact
          </Link>
          <Link to="/aboutus" className={navLinkClasses}>
            About Us
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-base hover:text-[#28A745] transition-all duration-300">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button onClick={toggleMenu} className="p-2 bg-[#28A745]/10 rounded-md">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#D4EDDA] rounded-lg shadow-lg z-50">
              {/* Mobile Search Bar */}
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-gray-50 border-b border-gray-200 px-3 py-2"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    window.dispatchEvent(
                      new CustomEvent("product-search", { detail: e.target.value })
                    );
                  }}
                  className="outline-none bg-transparent text-sm text-gray-700 w-full placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="ml-1 text-[#28A745] hover:text-[#1E7A36] transition-colors duration-200"
                >
                  <Search size={18} />
                </button>
              </form>

              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-base text-gray-900 hover:text-[#28A745] hover:underline transition-all duration-300"

              >
                Home
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-base hover:text-[#28A745] hover:underline transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/features"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-base hover:text-[#28A745] hover:underline transition-all duration-300"
              >
                Features
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-base hover:text-[#28A745] hover:underline transition-all duration-300"
              >
                Contact
              </Link>
              <Link
                to="/aboutus"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-base hover:text-[#28A745] hover:underline transition-all duration-300"
              >
                About Us
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-base flex items-center hover:text-[#28A745] hover:underline transition-all duration-300"
              >
                <ShoppingBag size={18} className="mr-2" /> Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
