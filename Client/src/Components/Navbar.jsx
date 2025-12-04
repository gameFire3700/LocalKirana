import React, { useState, useEffect } from "react";
import Image1 from "../assets/images/Logo.png";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [retailerOpen, setRetailerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isRetailerLoggedIn, setIsRetailerLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  /* ---------------- CART COUNT ---------------- */
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

  /* ---------------- LOGIN STATUS CHECK ---------------- */
  const updateAuthStatus = () => {
    setIsCustomerLoggedIn(!!localStorage.getItem("userToken"));
    setIsRetailerLoggedIn(!!localStorage.getItem("retailerToken"));
  };

  useEffect(() => {
    updateAuthStatus();
    window.addEventListener("authChanged", updateAuthStatus);
    return () => window.removeEventListener("authChanged", updateAuthStatus);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("retailerToken");

    window.dispatchEvent(new Event("authChanged"));
    window.location.href = "/";
  };

  /* ---------------- SEARCH ---------------- */
  const handleSearch = (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("product-search", { detail: searchQuery })
    );
  };

  const navLinkClasses =
    "relative text-base font-medium text-gray-900 hover:text-[#28A745] transition-all duration-300 cursor-pointer after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[#28A745] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="w-full bg-white py-2 shadow-sm relative">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center px-6">

        {/* ---------------- LOGO ---------------- */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={Image1} alt="Logo" className="w-10 rounded-lg" />
          <h1 className="text-xl font-bold text-[#28A745] tracking-wide">
            Local Kirana
          </h1>
        </div>

        {/* ---------------- DESKTOP LEFT MENU ---------------- */}
        <div className="hidden md:flex items-center space-x-6">

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-50 border border-gray-200 focus-within:border-[#28A745] focus-within:shadow-md rounded-full px-3 py-1.5"
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
              className="outline-none bg-transparent text-sm text-gray-700 w-48 md:w-64"
            />

            <button
              type="submit"
              className="ml-2 bg-[#28A745] hover:bg-[#23923E] text-white rounded-full p-1.5"
            >
              <Search size={16} />
            </button>
          </form>

          <Link to="/" className={navLinkClasses}>Home</Link>
          <Link to="/features" className={navLinkClasses}>Features</Link>
          <Link to="/contact" className={navLinkClasses}>Contact</Link>
          <Link to="/aboutus" className={navLinkClasses}>About Us</Link>
        </div>

        {/* ---------------- DESKTOP RIGHT MENU ---------------- */}
        <div className="hidden md:flex items-center space-x-6">

          {/* BECOME A RETAILER DROPDOWN (ALWAYS VISIBLE) */}
          <div className="relative">
            <button
              onClick={() => setRetailerOpen(!retailerOpen)}
              className={navLinkClasses}
            >
              Become a Retailer ▾
            </button>

            {retailerOpen && (
              <div className="absolute right-0 bg-white border border-gray-200 shadow-lg rounded-lg w-48 mt-2 z-50">
                <Link
                  to="/retailer/login"
                  onClick={() => setRetailerOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Retailer Login
                </Link>

                <Link
                  to="/retailer/register"
                  onClick={() => setRetailerOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Retailer Register
                </Link>
              </div>
            )}
          </div>

          {/* LOGIN / LOGOUT */}
          {!isCustomerLoggedIn && !isRetailerLoggedIn ? (
            <Link to="/login" className={navLinkClasses}>Login</Link>
          ) : (
            <button
              onClick={handleLogout}
              className={`${navLinkClasses} hover:text-red-600`}
            >
              Logout
            </button>
          )}

          {/* CART */}
          <Link to="/cart" className="relative cursor-pointer hover:text-[#28A745]">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

        {/* ---------------- MOBILE MENU BUTTON ---------------- */}
        <div className="md:hidden relative">
          <button onClick={toggleMenu} className="p-2 bg-[#28A745]/10 rounded-md">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* ---------------- MOBILE DROPDOWN ---------------- */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50">

              {/* SEARCH */}
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-gray-50 border-b border-gray-200 px-3 py-2"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none bg-transparent text-sm text-gray-700 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="ml-1 text-[#28A745]">
                  <Search size={18} />
                </button>
              </form>

              <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2">Home</Link>
              <Link to="/features" onClick={() => setIsOpen(false)} className="block px-4 py-2">Features</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-2">Contact</Link>
              <Link to="/aboutus" onClick={() => setIsOpen(false)} className="block px-4 py-2">About Us</Link>

              {/* ALWAYS SHOW RETAILER OPTIONS */}
              <Link to="/retailer/login" onClick={() => setIsOpen(false)} className="block px-4 py-2">Retailer Login</Link>
              <Link to="/retailer/register" onClick={() => setIsOpen(false)} className="block px-4 py-2">Retailer Register</Link>

              {/* LOGIN / LOGOUT */}
              {!isCustomerLoggedIn && !isRetailerLoggedIn ? (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-2">Login</Link>
              ) : (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="block px-4 py-2 text-left w-full hover:text-red-600"
                >
                  Logout
                </button>
              )}

              <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-4 py-2">Cart</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
