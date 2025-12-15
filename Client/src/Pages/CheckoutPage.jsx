import React, { useState, useEffect } from "react";

// Dummy payment link
const PAYMENT_LINK = "https://example.com/payment";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    setSelectedProducts(savedCart.map((p) => p.id)); // default all selected
  }, []);

  const toggleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const total = cart
    .filter((p) => selectedProducts.includes(p.id))
    .reduce((sum, p) => sum + p.price * p.quantity, 0);

  const proceedToPayment = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to proceed.");
      return;
    }
    // Redirect to dummy payment link (can integrate real payment)
    window.open(PAYMENT_LINK, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className={`bg-white p-4 rounded-2xl shadow-lg border transition hover:shadow-2xl ${
                selectedProducts.includes(product.id) ? "border-green-500" : "border-gray-200"
              }`}
            >
              <div className="relative">
                {product.imagePreview ? (
                  <img
                    src={product.imagePreview}
                    alt={product.name}
                    className="w-full h-40 object-contain rounded-xl bg-gray-100"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl">
                    No Image
                  </div>
                )}
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className="absolute top-2 right-2 w-5 h-5 accent-green-600"
                />
              </div>

              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-gray-500">{product.category?.name || product.category || "Unknown Category"}</p>
              <p className="text-green-700 font-bold mt-1">₹{product.price}</p>
              <p className="text-gray-600 mt-1">Quantity: {product.quantity}</p>

              {/* Detailed info */}
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
                {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
                {product.unit && <p><strong>Unit:</strong> {product.unit}</p>}
                {product.weight && <p><strong>Weight:</strong> {product.weight}</p>}
                {product.description && <p><strong>Description:</strong> {product.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6 w-full max-w-5xl flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-700">
            Total: <span className="text-green-700">₹{total}</span>
          </h3>
          <button
            onClick={proceedToPayment}
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
