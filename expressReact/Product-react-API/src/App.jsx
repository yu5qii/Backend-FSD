import { useEffect, useState } from "react";
import "./App.css"; // Import the styles here

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    const product = { name, price: Number(price), category };

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        alert("Failed to add product.");
        return;
      }

      setName("");
      setPrice("");
      setCategory("");
      getProducts();
    } catch (error) {
      alert("Could not connect to the server.");
    }
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    getProducts();
  };

  return (
    <div className="app-container">
      <div className="card">
        <header className="header">
          <h1>Product Management</h1>
          <p className="subtitle">Manage your inventory seamlessly</p>
        </header>

        {/* Add Product Form */}
        <form className="product-form" onSubmit={addProduct}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            + Add Product
          </button>
        </form>
      </div>

      {/* Product Table */}
      <div className="table-container card">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No products found. Add one above!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="text-muted">#{product.id}</td>
                  <td className="font-medium">{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>
                    <span className="badge">{product.category}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;