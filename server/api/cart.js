const express = require('express');
const router = express.Router();
// const Cart = require('../db/models/cart.js');

// In-memory storage for cart
let cartItems = [];

// Route to get current state of the cart
router.get('/cart', (req, res) => {
    res.json(cartItems);
});

// Route to add an item to the cart
router.post('/cart', (req, res) => {
    const item = req.body;
    cartItems.push(item);
    res.json({ message: 'Item added to the cart successfully.' });
});

// Route to update an item in the cart
router.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const newItem = req.body;

    cartItems = cartItems.map(item => item.id === id ? newItem : item);
    res.json({ message: `Item with id ${id} has been updated.` });
});

// Route to delete an item from the cart
router.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    cartItems = cartItems.filter(item => item.id !== id);
    res.json({ message: `Item with id ${id} has been deleted.` });
});

module.exports = router;
