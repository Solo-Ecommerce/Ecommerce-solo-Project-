import React, { useState, useEffect } from "react";
import stripePaymentRedirection from "../api-create-payment-intent/route";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

// stripePaymentRedirection

const Checkout = ({ amount }) => {
  const stripe = useState();
  const Elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  return <div>hi</div>;
};

export default Checkout;
