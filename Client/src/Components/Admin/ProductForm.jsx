// src/Components/Admin/ProductForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";

const ProductForm = ({ setIsFormVisible, editIndex = null }) => {
  const { products, addProduct, updateProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  useEffect(() => {
    if (editIndex !== null) {
      setProduct(products[editIndex]);
    }
  }, [editIndex]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      updateProduct(editIndex, product);
    } else {
      addProduct(product);
    }
    setIsFormVisible(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F0FFF0] p-6 rounded-xl shadow-inner mb-6"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="p-3 border rounded-lg"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          required
          className="p-3 border rounded-lg"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          required
          className="p-3 border rounded-lg"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-[#28A745] hover:bg-[#218838] text-white px-6 py-2 rounded-full font-semibold transition"
      >
        {editIndex !== null ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
