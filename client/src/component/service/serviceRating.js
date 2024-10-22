import axios from "axios";
// we will import the avrage rating of all product with the id

export const getAverageRatingByProductId = async (id) => {
  return axios
    .get(`http://localhost:3000/rating/getAllAverageRating/${id}`)
    .then((res) => {
      console.log("this is the average", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("average is not available", err);
      throw err;
    });
};
