import React, { useEffect, useState } from "react";
import RetailerSidebar from "./RetailerSidebar";
import { fetchMyProducts, deleteProduct } from "../../api/retailerApi";
import { Link } from "react-router-dom";

const RetailerProducts = () => {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const res = await fetchMyProducts();
    setProducts(res.data.products);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("❌ Are you sure you want to delete this product?")) return;

    await deleteProduct(id);
    load();
    alert("Deleted successfully!");
  };

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen">
      <RetailerSidebar />

      <main className="ml-0 lg:ml-64 p-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#343A40]">My Products</h2>

          {/* Add Product Button */}
          <Link
            to="/retailer/add-product"
            className="px-5 py-3 bg-[#28A745] hover:bg-[#218838] text-white font-semibold rounded-xl shadow transition"
          >
            + Add New Product
          </Link>
        </div>

        {/* No Products */}
        {products.length === 0 ? (
          <div className="text-center text-gray-600 text-xl bg-white p-10 rounded-xl shadow">
            No products added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 border border-[#D4EDDA]"
              >
                {/* Product Image */}
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt={p.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-xl font-bold text-[#343A40]">{p.name}</h3>

                <p className="text-gray-600 mt-1">
                  <span className="font-semibold text-[#28A745]">₹{p.price}</span>
                  <span className="ml-3 text-gray-500">Stock: {p.stock}</span>
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  {p.brand && <span className="mr-3">Brand: {p.brand}</span>}
                  {p.unit && <span>Unit: {p.unit}</span>}
                </p>

                {/* Status Badge */}
                <div className="mt-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      p.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                  <Link
                    to={`/retailer/edit-product/${p._id}`}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-semibold transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RetailerProducts;
