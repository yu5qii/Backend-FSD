import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {

  const[products, setProducts] = useState([]);
  const[name, setName] = useState("");
  const[price, setPrice] = useState("");
  const[category, setCategory] = useState("");

  const getProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    setProducts;
  }

  //ADD PRODUCTS
  const addProduct = async (e) => {
    e.preventDefault();
    const product = {
      name : name,
      price : price,
      category : category
    };

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      BODY: json.stringify(product)
    });
  }
  return (
    <div>App</div>
  )
}

export default App