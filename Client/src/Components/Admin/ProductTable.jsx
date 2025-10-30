// src/Components/Admin/ProductTable.jsx
import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { Pencil, Trash } from "lucide-react";

const ProductTable = ({ setEditIndex, setIsFormVisible }) => {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#E8F5E9] text-[#28A745]">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No products added yet.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr
                key={index}
                className="border-b hover:bg-[#F9FFF9] transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  {product.image && (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  )}
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setIsFormVisible(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteProduct(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
