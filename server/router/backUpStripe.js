// route for stripe :

// in the file route : stripe route:
/**
 * 
 * const express = require("express");
const stripe = require("stripe")(process.env.SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const stripeRouter = express.Router();

stripeRouter.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);

  const indempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create(
        {
          amount: product.price * 100, // Stripe uses cents
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased ${product.name}`,
          shipping: {
            name: token.card.name,
            adress: {
              country: token.card.adress_country,
            },
          },
        },

        { idempotencyKey: indempontencyKey }
      )
    )
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.error("Error creating payment:", err);
      res.status(500).json({ error: "Payment failed" });
    });
});

module.exports = stripeRouter;

 */

//index.js
// const stripeRouter = require("./router/stripeRoute");
// const stripe = require("stripe")(process.env.SECRET_KEY);
// app.use("/stripe", stripeRouter);

// Cart :
// import StripeCheckout from "react-stripe-checkout";
// const makePaymentStripe = async (token) => {
//   const body = {
//     token,
//     cart,
//   };
//   const headers = {
//     // Authorization: `pk_test_51QH0luCLxAJ2qPzQQR7m0NLQyTMm2f2Z5crmouRySocWfKC62IGSRSCk4lOZZc5rjZJFh0edZyTZ12qbtQMZhTue00XqiX2nF2`,
//     "Content-type": "application/json",
//   };
//   return fetch(`http://localhost:3000/stripe`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(body),
//   })
//     .then((response) => {
//       console.log("RESPONSE", response);
//       const { status } = response;
//       console.log("STATUS", status);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
