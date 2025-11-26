// CheckoutPage.jsx
import React from 'react';
import PayPalCheckout from './PayPalCheckout';
import { useAuth } from '../auth'; // your auth hook

export default function CheckoutPage() {
  const { user } = useAuth();
  const handleSuccess = (capture) => {
    alert('Payment successful! Premium enabled.');
    // refresh user profile or token
  };
  return <PayPalCheckout amount="9.99" userId={user._id} onSuccess={handleSuccess} />;
}
