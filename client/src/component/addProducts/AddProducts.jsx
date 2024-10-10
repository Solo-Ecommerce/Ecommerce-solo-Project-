// import React, { useState } from "react";
// import { addProductAdmin } from "../service/serviceProducts";
// import "./AddProducts.css";

// function AddProducts() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [images, setImages] = useState([]);
//   const [addProd, setAddProd] = useState([]);

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);
//   };

//   const handleClick = () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("category", category);

//     images.forEach((image, index) => {
//       formData.append("images", image);
//     });

//     addProductAdmin(formData)
//       .then((res) => {
//         alert("Product added successfully!");
//         setAddProd(res);
//       })
//       .catch((err) => console.log("The product is not added", err));
//   };

//   return (
//     <div className="add__product__container__admin">
//       <div className="product__details__admin">
//         <h3 className="add__product__admin">Add New Product</h3>
//         <input
//           className="input__add__product__admin"
//           type="text"
//           placeholder="Product Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           className="input__add__product__admin"
//           type="text"
//           placeholder="Description"
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           className="input__add__product__admin"
//           type="number"
//           placeholder="Price"
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <input
//           className="input__add__product__admin"
//           type="text"
//           placeholder="Category"
//           onChange={(e) => setCategory(e.target.value)}
//         />
//         <input
//           className="input__add__product__admin"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageUpload}
//         />
//         <button className="submit__btn" onClick={handleClick}>
//           Add Product
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddProducts;

import React, { useState } from "react";
import axios from "axios";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

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
      formData.append("upload_preset", "itchigo220"); // Replace with your Cloudinary upload preset

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
      // Optionally, reset form or show success message
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProducts;
