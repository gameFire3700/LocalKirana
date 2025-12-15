import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs";
import Features from "./Components/Features";
import ContactUs from "./Components/ContactUs"; 
import ProductDetail from "./Components/ProductDetail";

//import Dashboard from "./Components/Dashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";

import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import RetailerLogin from "./Pages/RetailerLogin";
import RetailerRegister from "./Pages/RetailerRegister";
import RetailerDashboard from "./Components/Retailer/RetailerDashboard";
import RetailerProducts from "./Components/Retailer/RetailerProducts";
import RetailerAddProduct from "./Components/Retailer/RetailerAddProduct";
import RetailerEditProduct from "./Components/Retailer/RetailerEditProduct";
import RetailerInventory from "./Components/Retailer/RetailerInventory";
import RetailerLayout from "./Layout/RetailerLayout";

import AdminRegister from "./Pages/AdminRegister";
import AdminLogin from "./Pages/AdminLogin";

import AdminRetailers from "./Components/Admin/AdminRetailers";
import AdminLayout from "./Layout/AdminLayout";
import ProductApproval from "./Components/Admin/ProductApproval";
import ApprovedProducts from "./Components/Admin/ApprovedProducts";
import RejectedProducts from "./Components/Admin/RejectedProducts";

import SearchResults from "./Pages/SearchResults"; 
const Layout = () => (
  <div className="flex flex-col min-h-screen"> 
    <Navbar />
    <main className="flex-grow">
      <Outlet /> 
    </main> 
    <Footer />
  </div>
);


const router = createBrowserRouter([
  // ---------------- Main Website Layout -------------
  {
    path: "/",
    element: <Layout />,  // Navbar + Footer
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "features", element: <Features /> },
      { path: "contact", element: <ContactUs /> },
      { path: "profile", element: <Profile /> },
      { path: "cart", element: <CartPage /> },
      { path: "search", element: <SearchResults /> },
      { path: "checkout", element: <CheckoutPage /> },
      // Retailer auth pages (they can stay here because they need navbar)
      { path: "retailer/login", element: <RetailerLogin /> },
      { path: "retailer/register", element: <RetailerRegister /> },
      { path: "product/:id", element: <ProductDetail/> },

    ],
    errorElement: <h2 className="text-center text-red-500 mt-10">❌ Page Not Found</h2>,
  },

  // ---------------- Retailer Panel Layout ----------------
  {
    path: "/retailer",
    element: <RetailerLayout />,   // NO NAVBAR, NO FOOTER
    children: [
      { path: "dashboard", element: <RetailerDashboard /> },
      { path: "products", element: <RetailerProducts /> },
      { path: "add-product", element: <RetailerAddProduct /> },
      { path: "edit-product/:id", element: <RetailerEditProduct /> },
      { path: "inventory", element: <RetailerInventory /> },
    ],
    errorElement: <h2    className="text-center text-red-500 mt-10">❌ Page Not Found</h2>,
  },  
   // ---------------- Admin Panel Layout (SEPARATE UI) ----------------
  
{
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/register",
    element: <AdminRegister />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,  // NO NAVBAR, NO FOOTER
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "retailers", element: <AdminRetailers/> },
      { path: "product-approval", element: <ProductApproval /> },
      { path: "approved-products", element: <ApprovedProducts /> },
      { path: "rejected-products", element: <RejectedProducts/> },

      
    ],
  },

]);

const App = () => <RouterProvider router={router} />;

export default App;


