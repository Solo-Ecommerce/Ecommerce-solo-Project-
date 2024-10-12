import React, { useEffect, useState } from "react";
import AdminSideBar from "../adminSideBar/AdminSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./AdminHomePage.css";
import { getAllProducts, deleteProduct } from "../service/serviceProducts";

function AdminHomePage({ handleClickSelectedElem }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  // const [selectedProductId, setSelectedProductId] = useState(null);

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
      setSuccessMessage("Le produit a été supprimé avec succès.");
      setTimeout(() => setSuccessMessage(""), 3000);
      console.log(`Product with id ${id} deleted.`);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };
  const handleUpdate = (id) => {
    handleClickSelectedElem(id);
    navigate(`/updateproducts`);
  };

  return (
    <div className="global__container_admin__home__page">
      <h3 className="title__h3__admin">All Products</h3>
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
                      <td className="action__admin">
                        {/* <button
                          className="delete-button"
                          onClick={() => handleDelete(product.productId)}
                        >
                          <FontAwesomeIcon
                            className="delete__icon__admin"
                            icon={faTrash}
                            onClick={handleClickUpdate(product.productId)}
                          />
                        </button>
                        <button className="submit-button" type="submit">
                          <FontAwesomeIcon icon={faSync} /> Update
                        </button> */}
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(product.productId)}
                        >
                          <FontAwesomeIcon
                            className="delete__icon__admin"
                            icon={faTrash}
                          />
                        </button>

                        <button
                          className="submit-button"
                          onClick={() => handleUpdate(product.productId)}
                        >
                          <FontAwesomeIcon icon={faSync} /> Update
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
      {successMessage && (
        <div className="success-popup__admin">{successMessage}</div>
      )}
    </div>
  );
}

export default AdminHomePage;
