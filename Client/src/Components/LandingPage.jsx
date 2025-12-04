import React, { useState } from "react";
import HeroSection from "../Components/HeroSection";
import ProductList from "../Components/ProductList";
import FeaturesSection from "../Components/FeaturesSection";
import ReviewsSection from "../Components/ReviewsSection";
import CategoryBar from "../Components/CategoryBar";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <HeroSection />

      {/* Category Bar */}
      <CategoryBar onSelect={setSelectedCategory} />

      {/* Product listing */}
      <ProductList category={selectedCategory} />

      <FeaturesSection />

      <ReviewsSection />
    </div>
  );
};

export default LandingPage;
