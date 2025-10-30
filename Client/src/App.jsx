import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import AboutUs from "./Components/AboutUs";
import Features from "./Components/Features";
import ContactUs from "./Components/ContactUs";
import Dashboard from "./Components/Dashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CartPage from "./Pages/CartPage";
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
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "features", element: <Features /> },
      { path: "contact", element: <ContactUs /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "cart", element: <CartPage />} ,
      { path: "search", element: <SearchResults /> },
    ], 
    errorElement: <h2 className="text-center text-red-500 mt-10">❌ Page Not Found</h2>,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
