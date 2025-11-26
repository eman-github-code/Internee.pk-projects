import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

export default function PayPalCheckout({ amount, userId, onSuccess }) {
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, currency: "USD" }}>
      <PayPalButtons
        createOrder={async () => {
          const res = await axios.post('/api/payments/paypal/create-order', { amount, userId });
          // return PayPal order id
          return res.data.id;
        }}
        onApprove={async (data, actions) => {
          // call server to capture
          const res = await axios.post('/api/payments/paypal/capture-order', { orderID: data.orderID, userId });
          onSuccess(res.data);
        }}
        onError={(err) => {
          console.error(err);
          alert('Payment error');
        }}
      />
    </PayPalScriptProvider>
  );
}
