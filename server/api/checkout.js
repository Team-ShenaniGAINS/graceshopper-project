const express = require('express');
const router = express.Router();

router.post('/order', (req, res) => {
  // Process the order and return the order details
  const { name, email, address, products } = req.body;
  const order = {
    id: 'order123',
    total: products.reduce((acc, product) => acc + product.price, 0),
    name,
    email,
    address,
    products
  };
  res.json(order);
});

module.exports = router;
