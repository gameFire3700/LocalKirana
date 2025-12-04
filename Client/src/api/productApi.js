export const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/product");
    return await res.json();
  } catch (err) {
    console.log("Product fetch error:", err);
    return { success: false, products: [] };
  }
};    
