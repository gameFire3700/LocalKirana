import React from "react";

import HeadphonesImg from "../assets/images/headpfone.jpg"; // ✅ Renamed properly

import { createBrowserRouter } from "react-router-dom";



import { Star, ShoppingCart } from "lucide-react";

import RiceImg from "../assets/images/rice.jpg";

import OilImg from "../assets/images/oil.jpg";

import ShirtImg from "../assets/images/mens-shirt.jpg";

import SugarImg from "../assets/images/sugar.png"; // also fixed sugar extension to match



export default function ProductGrid() {


    return (

 

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

      {/* 1️⃣ Headphones */}

      <ProductCard

        Image={HeadphonesImg}

        title="Best Headphones"

        brand="Local"

        inStock={true}

        discount="20% OFF"

        price="₹400.00"

        oldPrice="₹500.00"

        savings="Save ₹100"

        reviews="120 reviews"

      />



      {/* 2️⃣ Rice */}

      <ProductCard

        Image={RiceImg}

        title="Premium Basmati Rice (5kg)"

        brand="IndiaGate"

        inStock={true}

        discount="15% OFF"

        price="₹600.00"

        oldPrice="₹700.00"

        savings="Save ₹100"

        reviews="80 reviews"

      />



      {/* 3️⃣ Fortune Oil */}

      <ProductCard

        Image={OilImg}

        title="Fortune Sunlite Oil (1L)"

        brand="Fortune"

        inStock={true}

        discount="10% OFF"

        price="₹170.00"

        oldPrice="₹190.00"

        savings="Save ₹20"

        reviews="210 reviews"

      />



      {/* 4️⃣ Men’s Shirt */}

      <ProductCard

        Image={ShirtImg}

        title="Men’s Cotton Shirt"

        brand="Roadster"

        inStock={true}

        discount="25% OFF"

        price="₹750.00"

        oldPrice="₹1000.00"

        savings="Save ₹250"

        reviews="95 reviews"

      />



      {/* 5️⃣ Sugar */}

      <ProductCard

        Image={SugarImg}

        title="Refined White Sugar (1kg)"

        brand="Tata"

        inStock={true}

        discount="5% OFF"

        price="₹48.00"

        oldPrice="₹50.00"

        savings="Save ₹2"

        reviews="60 reviews"

      />

    </div>

  );

}



function ProductCard({

  Image,

  title,

  brand,

  inStock,

  discount,

  price,

  oldPrice,

  savings,

  reviews,

}) {

  return (

    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-[#D4EDDA] transition-all duration-300 hover:-translate-y-1 w-[280px]">

     

      {/* Image Section */}

      <div className="relative overflow-hidden rounded-t-2xl">

        <img

          src={Image}

          alt={title}

          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"

        />



        {/* Discount Badge */}

        <div className="absolute top-3 left-3 bg-[#FF6200] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">

          {discount}

        </div>



        {/* Add to Cart Overlay */}

        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center transition">

          <button className="bg-[#28A745] hover:bg-[#218838] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow">

            <ShoppingCart size={16} />

            Add to Cart

          </button>

        </div>

      </div>



      {/* Content Section */}

      <div className="p-4 flex flex-col gap-3">

        {/* Tags */}

        <div className="flex items-center gap-2 flex-wrap">

          <span className="bg-[#D4EDDA] text-[#28A745] text-xs font-semibold px-3 py-1 rounded-full">

            Brand: {brand}

          </span>

          <span className="bg-[#FFF4E0] text-[#FF6200] text-xs font-semibold px-3 py-1 rounded-full">

            {inStock ? "In Stock" : "Out of Stock"}

          </span>

        </div>



        {/* Title */}

        <h2 className="text-lg font-bold text-[#343A40] truncate" title={title}>

          {title}

        </h2>



        {/* Rating */}

        <div className="flex items-center gap-1">

          {Array(4)

            .fill(0)

            .map((_, i) => (

              <Star

                key={i}

                className="text-[#FF6200] fill-[#FF6200]"

                size={16}

              />

            ))}

          <Star className="text-gray-300" size={16} />

          <span className="text-sm text-gray-600 ml-1">({reviews})</span>

        </div>



        {/* Price Section */}

        <div className="flex flex-col">

          <span className="text-xl font-bold text-[#28A745]">{price}</span>

          <div className="flex items-center gap-2 text-sm">

            <span className="line-through text-gray-400">{oldPrice}</span>

            <span className="text-[#FF6200] font-semibold">{savings}</span>

          </div>

        </div>



        {/* Buy Now Button */}

        <button className="w-full bg-gradient-to-r from-[#28A745] to-[#FF6200] text-white py-2 rounded-full font-semibold text-sm mt-2 hover:opacity-90 transition">

          Buy Now

        </button>

      </div>

    </div>

  );

}