import React, { useState, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const { addProduct } = useContext(ProductContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.category || !product.stock) {
      alert("Please fill all fields");
      return;
    }
    addProduct(product);
    setProduct({ name: "", price: "", category: "", stock: "", image: null });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 Add Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md space-y-3">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Number of Stocks"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
