import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const CategoryBar = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axiosClient.get("/category/all");
    setCategories(res.data.data);
  };

  const handleSelect = (id) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="w-full bg-[#F0FFF0] py-5 px-6 shadow-sm overflow-x-auto">
      <div className="flex justify-center gap-20 min-w-full">

        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => handleSelect(cat._id)}
            className={`flex flex-col items-center cursor-pointer transition-all
              ${active === cat._id ? "scale-110" : "scale-100"}
            `}
          >

            {/* Category Image with Modern Border */}
            <div className="w-24 h-24 flex justify-center items-center mb-1">
              <img
                src={
                  cat.image_url?.startsWith("http")
                    ? cat.image_url
                    : `http://localhost:5000/${cat.image_url}`
                }
                alt={cat.name}
                className="
                  w-24 h-24 object-cover
                  border-2 border-gray-300
                  shadow-md
                  rounded-xl
                  p-1
                  hover:scale-105 transition-all
                "
              />
            </div>

            {/* Category Name (centered + thoda upar + modern font) */}
            <p
              className={`text-[15px] font-semibold tracking-wide text-center -mt-1
                ${
                  active === cat._id
                    ? "text-blue-600"
                    : "text-gray-800"
                }
              `}
            >
              {cat.name}
            </p>

            {/* Underline Active Style */}
            {active === cat._id && (
              <div className="w-10 h-[3px] bg-blue-600 mt-1 rounded-full"></div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryBar;
