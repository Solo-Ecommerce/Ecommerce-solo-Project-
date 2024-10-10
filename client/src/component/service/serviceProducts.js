import axios from "axios";

export const getAllProducts = async () => {
  return axios
    .get(`http://localhost:3000/products/getAllProducts`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("datafeched", error);
      throw error;
    });
};

export const deleteProduct = async (id) => {
  return axios
    .delete(`http://localhost:3000/products/delete/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("failed to delete product", error);
      throw error;
    });
};

// export const addProductAdmin = async (
//   name,
//   description,
//   price,
//   category,
//   images
// ) => {
//   return axios
//     .post(`http://localhost:3000/products/addProduct`, {
//       name,
//       description,
//       price,
//       category,
//       images: imageUrls,
//     })
//     .then((res) => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch((error) => {
//       console.log("Error adding product", error);
//       throw error;
//     });
// };

export const addProductAdmin = async (
  name,
  description,
  price,
  category,
  images
) => {
  return axios
    .post(`http://localhost:3000/products/addProduct`, {
      name,
      description,
      price,
      category,
      images,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(
        "Error adding product",
        error.response?.data || error.message
      );
      throw error;
    });
};
