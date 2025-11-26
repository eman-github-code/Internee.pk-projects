// routes/stripe.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-session', async (req, res) => {
  const { price, userId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Premium Access' },
        unit_amount: Math.round(price * 100)
      },
      quantity: 1
    }],
    success_url: `${process.env.FRONTEND_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payments/cancel`,
    metadata: { userId }
  });
  res.json({ id: session.id, url: session.url });
});

module.exports = router;
