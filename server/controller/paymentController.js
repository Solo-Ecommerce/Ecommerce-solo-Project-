// const { OrderProduct, Product, User, Payment } = require("../indexdatabase");
// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.SECRET_KEY);

// const createPayment = async (req, res) => {
//   const { userId, products, paymentMethod, totalAmount = 1 } = req.body;

//   try {
//     if (!totalAmount || isNaN(totalAmount)) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or missing total amount" });
//     }

//     if (paymentMethod === "cash") {
//       // Handle cash payment
//       const payment = await Payment.create({
//         userId,
//         paymentMethod,
//         amount: totalAmount,
//         status: "pending",
//       });

//       // Associate products with payment
//       await Promise.all(
//         products.map(async (productId) => {
//           await OrderProduct.create({
//             paymentId: payment.id,
//             productId,
//           });
//         })
//       );

//       return res.status(201).json({ message: "Cash payment created", payment });
//     } else if (paymentMethod === "stripe") {
//       // Handle Stripe payment
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: Math.round(Number(totalAmount) * 100), // Convert to cents and ensure it's a number
//         currency: "usd",
//         metadata: { userId },
//       });

//       const payment = await Payment.create({
//         userId,
//         paymentMethod,
//         amount: totalAmount,
//         status: "pending",
//         stripePaymentId: paymentIntent.id,
//       });

//       // Associate products with payment
//       await Promise.all(
//         products.map(async (productId) => {
//           await OrderProduct.create({
//             paymentId: payment.id,
//             productId,
//           });
//         })
//       );

//       return res.status(201).json({
//         message: "Stripe payment created",
//         payment,
//         clientSecret: paymentIntent.client_secret,
//       });
//     } else {
//       return res.status(400).json({ message: "Invalid payment method" });
//     }
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Error creating payment", error: err.message });
//   }
// };

// const updatePayment = async (req, res) => {
//   // const { paymentId } = req.params;
//   const { status, paymentId } = req.body;
//   try {
//     const payment = await Payment.findByPk(paymentId);
//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }
//     payment.status = status;
//     await payment.save();
//     return res.status(200).json({ message: "Payement status is updated" });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Error updating payment status", err: err.message });
//   }
// };

// const getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["name", "email"], // Include user details
//         },
//         {
//           model: Product,
//           through: { attributes: [] }, // Include associated products
//         },
//       ],
//     });

//     if (payments.length === 0) {
//       return res.status(404).json({ message: "No payments found" });
//     }

//     return res.status(200).json(payments);
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };

// const getPayementById = async (req, res) => {
//   const paymentId = req.params.id; // Get the payment ID from the request params
//   if (!paymentId) {
//     return res.status(400).send("Payment ID is required");
//   }
//   try {
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
//     res.json(paymentIntent);
//   } catch (error) {
//     console.error("Error retrieving payment intent:", error);
//     res.status(500).send("Error retrieving payment intent");
//   }
// };

// module.exports = {
//   createPayment,
//   updatePayment,
//   getAllPayments,
//   getPayementById,
// };
