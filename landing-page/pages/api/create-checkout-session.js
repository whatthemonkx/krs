// pages/api/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Amount should be in the smallest currency unit (e.g., cents for USD)
        currency: 'usd',
      });

      res.status(200).json({ sessionId: paymentIntent.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
