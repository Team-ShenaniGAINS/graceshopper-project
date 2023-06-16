const express = require("express");
const router = express.Router();
// const Cart = require('../db/models/cart.js');

// In-memory storage for cart
let cartItems = [];

// Route to get current state of the cart
router.get("/", (req, res) => {
	res.json(cartItems);
});

// fetchCartItems based on userId
router.get("/:userId", (req, res) => {
	console.log(cartItems);
	console.log(req.params.userId);

	const userCartItems = cartItems.filter(
		(item) => item.userId === +req.params.userId
	);
	res.json(userCartItems);
});

// Route to add an item to the cart
router.post("/", (req, res) => {
	
	const item = req.body;
	cartItems.push(item);
	res.json({ message: "Item added to the cart successfully." });
});

// Route to update an item in the cart
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const newItem = req.body;

	cartItems = cartItems.map((item) => (item.id === id ? newItem : item));
	res.json({ message: `Item with id ${id} has been updated.` });
});

// Route to delete an item from the cart
router.delete("/:productId/remove", (req, res) => {
	const { productId } = req.params;
	cartItems = cartItems.filter((item) => item.productId !== productId);
	res.json({ message: `Item with id ${productId} has been deleted.` });
});

module.exports = router;


