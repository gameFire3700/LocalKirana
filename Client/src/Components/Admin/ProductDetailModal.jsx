import React from "react";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-lg border">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">Close</button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>

            <div className="flex gap-4 items-center">
              <div>
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-lg font-bold text-green-700">₹ {product.price}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Stock</div>
                <div className="text-lg font-semibold">{product.stock}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Category</div>
                <div className="text-sm">{product.category_name}</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-500">SKU</div>
              <div className="text-sm">{product.sku}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
