import axios from "axios";

export const getWishlist = async (userId) => {
  return axios
    .get(`http://localhost:3000/wishlist/getWishlist/${userId}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("datafeched", error);
      throw error;
    });
};
export const addToWishlist = async (userId, productId) => {
  return axios
    .post(`http://localhost:3000/wishlist/addwishlist/${productId}`, {
      userId,
      productId,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(
        "Error adding product to the wishlist",
        error.response?.data || error.message
      );
      throw error;
    });
};
export const removeFromWishlist = async (userId, productId) => {
  return axios
    .delete(
      `http://localhost:3000/wishlist/deletewishlist/${userId}/${productId}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("failed to delete product from the wishlist", error);
      throw error;
    });
};
