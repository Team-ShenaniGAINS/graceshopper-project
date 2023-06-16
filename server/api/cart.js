const express = require("express");
const router = express.Router();

let cartItems = [];

router.get("/:userId", (req, res) => {
    const userCartItems = cartItems.filter(
        (item) => item.userId === +req.params.userId
    );
    res.json(userCartItems);
});

router.post("/", (req, res) => {
    const item = req.body;
    cartItems.push(item);
    res.json(item);
});

router.put("/:userId/update", (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    let foundItem = cartItems.find(item => item.userId === +userId && item.Product.id === productId);

    if (foundItem) {
        foundItem.quantity = quantity;
        res.json(foundItem);
    } else {
        res.status(404).json({ message: `Item with product id ${productId} for user ${userId} not found.` });
    }
});

router.delete("/:userId/remove", (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    
    const initialLength = cartItems.length;
    cartItems = cartItems.filter((item) => !(item.userId === +userId && item.Product.id === productId));
    
    if (initialLength > cartItems.length) {
        res.json({ message: `Item with product id ${productId} for user ${userId} has been deleted.` });
    } else {
        res.status(404).json({ message: `Item with product id ${productId} for user ${userId} not found.` });
    }
});

module.exports = router;
