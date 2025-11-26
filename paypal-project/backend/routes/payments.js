// routes/payments.js
const express = require('express');
const router = express.Router();
const { getPayPalToken } = require('../services/paypal');
const User = require('../users/models/User');

// create order
router.post('/paypal/create-order', async (req, res) => {
  try {
    const { amount = '9.99', currency = 'USD', userId } = req.body;
    const { token, base } = await getPayPalToken();

    const orderRes = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: currency, value: String(amount) } }],
        application_context: {
          brand_name: 'My LMS',
          return_url: `${process.env.FRONTEND_URL}/payments/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payments/cancel`
        }
      })
    });
    const order = await orderRes.json();
    // Optionally save order.id with userId in DB for reconciliation
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// capture order (after client approval)
router.post('/paypal/capture-order', async (req, res) => {
  try {
    const { orderID, userId } = req.body;
    const { token, base } = await getPayPalToken();

    const captureRes = await fetch(`${base}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    const capture = await captureRes.json();

    // Check capture status
    if (capture.status === 'COMPLETED' || capture.status === 'COMPLETED') {
      // update user: mark premium and add payment record
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          $set: { premium: true },
          $push: { payments: {
            provider: 'paypal',
            transactionId: capture.id || capture.purchase_units?.[0]?.payments?.captures?.[0]?.id,
            amount: capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || null,
            currency: capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.currency_code || null,
            status: 'COMPLETED'
          } }
        });
      }
    }

    res.json(capture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
