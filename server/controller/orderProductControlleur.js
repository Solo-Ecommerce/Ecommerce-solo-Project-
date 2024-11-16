// const { OrderProduct, Product, Payment } = require("../indexdatabase");

// // Create OrderProduct (add a product to an order)
// const createOrderProduct = async (req, res) => {
//   const { orderId, paymentId, productId, quantity } = req.body;

//   try {
//     //verify if the order and the payment exist
//     const payment = await Payment.findByPk(paymentId);
//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }
//     const orderProduct = await OrderProduct.create({
//       orderId,
//       paymentId,
//       productId,
//       quantity,
//     });
//     return res
//       .status(201)
//       .json({ message: "Product add to order", orderProduct });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Error adding product to order", err });
//   }
// };
// // Update product quantity in order
// const updateOrderProduct = async (req, res) => {
//   const { orderProductId, quantity } = req.body;
//   try {
//     const orderProduct = await OrderProduct.findByPk(orderProductId);
//     if (!orderProduct) {
//       res.status(404).json({ message: "order product not found" });
//     }
//     orderProduct.quantity = quantity;
//     await orderProduct.save();
//     return res
//       .status(200)
//       .json({ message: "Product quantity updated", orderProduct });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Error removing product order", err });
//   }
// };

// // delete order

// const deleteOrderProduct = async (req, res) => {
//   const { orderProductId } = req.params;
//   try {
//     // Find the OrderProduct by primary key (orderProductId)
//     const orderProduct = await OrderProduct.findByPk(orderProductId);
//     if (!orderProduct) {
//       // If the order product doesn't exist, return 404
//       return res.status(404).json({ message: "Cannot find the order product" });
//     }

//     // Delete the order product
//     await orderProduct.destroy();

//     // Return success message after deletion
//     return res
//       .status(200)
//       .json({ message: "The order product was deleted successfully" });
//   } catch (err) {
//     // Catch and return any errors during the process
//     return res
//       .status(500)
//       .json({ message: "Error deleting order product", err });
//   }
// };

// module.exports = {
//   createOrderProduct,
//   updateOrderProduct,
//   deleteOrderProduct,
// };
