// controllers/paymentController.js
// const Stripe = require("stripe");
// const { Payment } = require("../indexdatabase");
// console.log("paaaaaaaaaaaaayement", Payment);
// const stripe = new Stripe(process.env.SECRET_KEY);
// const stripe = require("stripe")(process.env.SECRET_KEY, {
//   apiVersion: "2024-06-20",
// });

// const createCheckoutSession = async (req, res) => {
//   const { cart, userId } = req.body;
//   console.log("CLIENT_URL:", process.env.CLIENT_URL);
//   // Ensure cart is not empty and userId is present
//   if (!cart || cart.length === 0) {
//     return res.status(400).send("Cart is empty.");
//   }

//   try {
//     const lineItems = cart.map((item) => {
//       if (!item.quantity || item.quantity <= 0) {
//         // Ensure a valid quantity is present
//         throw new Error(`Invalid quantity for item: ${item.name}`);
//       }

//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//             images: item.image || [],
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.quantity,
//       };
//     });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`,
//       metadata: {
//         userId: userId,
//       },
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Error creating Stripe session:", error);
//     res.status(400).send(error.message || "Error creating Stripe session");
//   }
// };

// module.exports = { createCheckoutSession };

// const createCheckoutSession = async (req, res) => {
//   const { cart, userId } = req.body;

//   if (!userId) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   try {
//     const lineItems = cart.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//           images: item.image || [],
//         },
//         unit_amount: parseInt(item.price * 100), // Stripe expects the amount in cents
//       },
//       quantity: item.quantity,
//     }));

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: lineItems.reduce(
//         (acc, item) => acc + item.price_data.unit_amount * item.quantity,
//         0
//       ), // Total price in cents
//       currency: "usd",
//       payment_method_types: ["card"],
//       metadata: {
//         userId: userId,
//       },
//     });

//     const clientSecret = paymentIntent.client_secret;

//     // You could store the paymentIntent details in the database here (optional)

//     await Payment.create({
//       userId, // Ensure this is passed correctly
//       cart,
//       amount: paymentIntent.amount / 100,
//       requestId: userId,
//       // status: paymentIntent.status,
//       paymentIntentId: paymentIntent.id,
//       paymentMethod: "stripe",
//       status: "pending",
//     });

//     res.json({
//       clientSecret,
//       url: `http://localhost:3000/stripe/checkoutStripe/${paymentIntent.id}`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };
// module.exports = { createCheckoutSession };
