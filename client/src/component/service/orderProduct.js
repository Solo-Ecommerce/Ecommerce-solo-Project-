import axios from "axios";

export const getAllOrders = async (userId) => {
  return axios
    .get(`http://localhost:3000/order/getallorder/${userId}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("datafeched", error);
      throw error;
    });
};

export const createOrderProd = async (orderData) => {
  return axios
    .post(`http://localhost:3000/order/createorderproduct`, orderData)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("create order failed", error);
      throw error;
    });
};
