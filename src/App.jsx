import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://686ff4cb46567442480108e5.mockapi.io/api/test/Items";

function App() {
  const [products, setProducts] = useState([]);
  const [itemname, setItemname] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}?limit=10`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      Itemname: itemname,
      Description: description,
      ImageUrl: `https://picsum.photos/200/150?random=${Date.now()}`,
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    setItemname("");
    setDescription("");
    setShowForm(false);
    fetchProducts();
  };

  return (
    <div style={{ width: "100%" }}>
       <div className="assignment-container">
      <h1 className="heading">Assignment</h1>

      <button onClick={() => setShowForm(!showForm)} className="add-button">
        {showForm ? "Cancel" : "Add Item"}
      </button>

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Itemname"
            value={itemname}
            onChange={(e) => setItemname(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}

      <div className="grid">
        {products.map((product) => (
          <div key={product.Id} className="card">
            <img
              src={
                product.ImageUrl ||
                `https://picsum.photos/200/150?random=${product.Id}`
              }
              alt={product.Itemname}
            />
            <h3>{product.Itemname}</h3>
            <p>{product.Description?.slice(0, 60)}...</p>
            <button
              onClick={() => handleDelete(product.Id)}
              className="delete-button"
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
}

export default App;
