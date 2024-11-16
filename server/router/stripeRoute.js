// stripeRouter.post("/create-checkout-session", async (req, res) => {
//   const { products } = req.body;
//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: product.name,
//         images: product.images ? [product.images[0]] : [],
//       },
//       unit_amount: Math.round(product.price * 100),
//     },
//     quantity: product.quantity,
//   }));
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3001/success",
//     cancel_url: "http://localhost:3001/cancelpayement",
//   });
//   res.json({ id: session.id });
// });

// module.exports = stripeRouter;

const express = require("express");
const stripe = require("stripe")(
  "sk_test_51IVaFbFxjk8PDaTL76yKaVIUU9OidqL1LtjbMeaupy880o5VtbAqgxUlTXBabroXbqrPqSYR2jhFePssJtJactWh00Rm7e29Ma"
);
const { v4: uuidv4 } = require("uuid");

const stripeRouter = express.Router();

stripeRouter.post("/payment", (req, res) => {
  const { cart, token } = req.body;
  console.log("PRODUCT", req.body);
  // console.log("PRICE", product.price);
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).send("Cart is empty or not properly formatted");
  }

  // Ensure price exists in each cart item
  cart.forEach((item) => {
    if (!item.price) {
      return res
        .status(400)
        .send("One or more items in the cart are missing a price");
    }
  });
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  const indempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create(
        {
          amount: totalPrice * 100, // Stripe uses cents
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased `,
          // shipping: {
          //   name: token.card.name,
          //   address: {
          //     country: token.card.address_country,
          //   },
          // },
        },

        { idempotencyKey: indempontencyKey }
      )
    )
    .then((result) => {
      console.log("ay 7aja ", result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error("Error creating payment:", err);
      res.status(500).json({ error: "Payment failed" });
    });
});

module.exports = stripeRouter;
