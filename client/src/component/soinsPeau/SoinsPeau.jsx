import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function SoinsPeau() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { category } = location.state || {}; // Retrieve category from location state
  console.log("Selected category: ", category);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/getProductByCategory/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      getProducts();
    }
  }, [category]); // Re-run effect when category changes

  return (
    <div>
      <h2>Products for {category}</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.productId} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.averageRating} / 5</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SoinsPeau;
