import React, { useEffect, useState } from "react";
import RetailerSidebar from "./RetailerSidebar";
import { fetchInventory } from "../../api/retailerApi";

const RetailerInventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchInventory();
      setProducts(res.data.data);
    };
    load();
  }, []);

  return (
    <div className="flex">
      <RetailerSidebar />

      <main className="ml-0 lg:ml-64 p-8 w-full">
        <h2 className="text-2xl font-bold mb-6">Inventory</h2>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Sold</th>
                <th className="p-3 text-left">Price</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className={p.stock <= 5 ? "bg-yellow-50" : ""}
                >
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">{p.sold_count || 0}</td>
                  <td className="p-3">₹{p.price}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </main>
    </div>
  );
};

export default RetailerInventory;
