import React, { useState } from "react";
import axios from "axios";
import "./AddProducts.css";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Soins de la peau",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const uploadImages = async () => {
    const imageUrls = [];

    for (const image of imageFiles) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "naruto");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/drbgxo3ua/image/upload",
          formData
        );
        imageUrls.push(res.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = await uploadImages();
    const productData = {
      ...formData,
      images: imageUrls,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/products/addProduct",
        productData
      );
      console.log("Product added:", response.data);
      setSuccessMessage("Le produit a été ajouté avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h3 className="title__product__admin">Add Product</h3>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            className="form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            className="form-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category:</label>
          <select
            className="form-input"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Soins de la peau">Soins de la peau</option>
            <option value="Soins des cheveux">Soins des cheveux</option>
            <option value="Soins des yeux">Soins des yeux</option>
            <option value="Soins des pieds">Soins des pieds</option>
            <option value="Cosmétiques">Cosmétiques</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Images:</label>
          <input
            className="form-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Add Product
        </button>
      </form>

      {successMessage && <div className="success-popup">{successMessage}</div>}
    </div>
  );
};

export default AddProducts;
