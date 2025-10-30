import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      removeFromCart(index);
    }
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="min-h-screen p-6 bg-[#F8FFF9]">
      <h2 className="text-3xl font-bold mb-6 text-[#28A745]">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((product, index) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center gap-3 border border-gray-100 hover:shadow-lg transition"
            >
              {/* Product Image */}
              {product.imagePreview ? (
                <img
                  src={product.imagePreview}
                  alt={product.name}
                  className="w-32 h-32 object-contain bg-[#f8f8f8] rounded-lg"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                  No Image
                </div>
              )}

              {/* Product Details */}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <span className="text-[#28A745] font-bold">₹{product.price}</span>

              {/* Quantity Controls */}
              <div className="flex items-center justify-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQuantity(index)}
                  className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition cursor-pointer"
                >
                  -
                </button>
                <span className="font-semibold">{product.quantity}</span>
                <button
                  onClick={() => increaseQuantity(index)}
                  className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 text-white py-1.5 px-4 rounded-full text-sm font-medium hover:opacity-90 transition cursor-pointer mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Total Section */}
      {cart.length > 0 && (
        <div className="mt-8 text-right text-2xl font-bold text-[#28A745]">
          Total: ₹{total}
        </div>
      )}
    </div>
  );
};

export default CartPage;
