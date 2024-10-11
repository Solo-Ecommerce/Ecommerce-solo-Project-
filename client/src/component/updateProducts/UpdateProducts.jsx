import React, { useState } from "react";
import axios from "axios";
import "./UpdateProducts.css"; // Import your CSS file

function UpdateProducts() {
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

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const imageUrls = await uploadImages();
    const productData = {
      ...formData,
      images: imageUrls,
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/products/update/${id}`,
        productData
      );
      console.log("Product modified:", response.data);
      setSuccessMessage("Le produit a été modifié avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="update-products">
      <h2 className="update-title">Update Product</h2>
      <form
        onSubmit={(e) => handleSubmit(e, formData.id)}
        className="update-form"
      >
        <div className="inputs__container__update">
          <input
            className="form-input__update"
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="form-input__update"
            type="text"
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            className="form-input__update"
            type="number"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
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
            Update Product
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
}

export default UpdateProducts;
