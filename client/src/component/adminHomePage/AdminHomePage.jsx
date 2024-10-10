import React, { useEffect, useState } from "react";
import AdminSideBar from "../adminSideBar/AdminSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./AdminHomePage.css";
import { getAllProducts, deleteProduct } from "../service/serviceProducts";

function AdminHomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        console.log("all products", data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.productId !== id));
      console.log(`Product with id ${id} deleted.`);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="global__container_admin__home__page">
      <div className="AdminSideBar__cont">
        <AdminSideBar className="AdminSideBar__in_adminHomePage" />
        <div className="admin__dashbord__container">
          <h3 className="admin__navbar__adminHomePage">Admin dashboard</h3>

          <div className="product__container__admin">
            {products.length > 0 ? (
              <table className="product__table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Ratings Count</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(product.productId)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>{product.ratingsCount}</td>
                      <td>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="product__image"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
