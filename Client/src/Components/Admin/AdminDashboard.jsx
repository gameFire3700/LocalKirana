import React, { useState, useEffect } from "react";
import { Trash2, Edit, PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const [products, setProducts] = useState(() => {
    // Load products from localStorage if available
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
    imagePreview: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === form.id
            ? { ...form, imagePreview: form.imagePreview }
            : p
        )
      );
      setIsEditing(false);
    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
      };
      setProducts([...products, newProduct]);
    }

    // Reset form
    setForm({
      id: null,
      name: "",
      category: "",
      price: "",
      stock: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleEdit = (product) => {
    setForm({ ...product });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-8 bg-[#F0FFF0] min-h-screen">
      <h1 className="text-4xl font-bold text-[#28A745] mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* Add/Edit Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto mb-10"
      >
        <h2 className="text-2xl font-semibold text-[#28A745] mb-4">
          {isEditing ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded col-span-2"
          />
          {form.imagePreview && (
            <img
              src={form.imagePreview}
              alt="Preview"
              className="h-40 object-cover rounded col-span-2"
            />
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-[#28A745] to-[#FF6200] text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2 relative"
          >
            {product.imagePreview && (
              <img
                src={product.imagePreview}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl"
              />
            )}
            <h3 className="font-semibold text-lg text-gray-800">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <p className="text-[#28A745] font-bold">₹{product.price}</p>
            <p
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="flex items-center gap-1 bg-[#FFF4E0] text-[#FF6200] px-3 py-1 rounded-full hover:opacity-90 transition"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center gap-1 bg-[#FF6200] text-white px-3 py-1 rounded-full hover:opacity-90 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
