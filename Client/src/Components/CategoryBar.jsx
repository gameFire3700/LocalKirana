import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../api/axiosClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE_URL = "http://localhost:5000";

const resolveImage = (img) => {
  if (!img) return "/no-image.png"; // ✅ LOCAL fallback
  if (img.startsWith("http")) return img;
  return `${BASE_URL}${img.startsWith("/") ? img : "/" + img}`;
};

const CategoryBar = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axiosClient.get("/category/");
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error("Category load failed", err);
    }
  };

  const scroll = (dir) => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  const handleSelect = (id) => {
    setActive(id);
    onSelect?.(id);
  };

  return (
    <div className="w-full bg-white shadow-sm py-6">
      <div className="flex justify-center items-center gap-6">

        {/* LEFT ARROW */}
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft size={22} />
        </button>

        {/* CATEGORY SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-10 max-w-[75%] overflow-hidden justify-center"
        >
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleSelect(cat._id)}
              className="flex flex-col items-center cursor-pointer flex-shrink-0"
            >
              <div
                className={`w-24 h-24 rounded-xl border flex items-center justify-center
                transition-all
                ${
                  active === cat._id
                    ? "border-blue-600 scale-110"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={resolveImage(cat.image_url)}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // 🔥 STOP LOOP
                    e.currentTarget.src = "/no-image.png";
                  }}
                />
              </div>

              <p
                className={`mt-2 text-sm font-semibold text-center
                ${
                  active === cat._id
                    ? "text-blue-600"
                    : "text-gray-800"
                }`}
              >
                {cat.name}
              </p>

              {active === cat._id && (
                <div className="w-8 h-[3px] bg-blue-600 mt-1 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight size={22} />
        </button>

      </div>
    </div>
  );
};

export default CategoryBar;
