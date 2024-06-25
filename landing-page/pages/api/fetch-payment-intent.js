// pages/api/fetch-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sessionId } = req.query;

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(sessionId);

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
