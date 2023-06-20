const express = require("express");
const router = express.Router();
const Product = require("../db/models/Products.js");
const requireAdmin  = require('./admin.js')

// GET /api/products
router.get("/", async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.send(products);
	} catch (err) {
		next(err);
	}
});

// POST /api/products
router.post("/", requireAdmin, async (req, res, next) => {
	try {
		const { name, price, quantity, imgUrl, description } = req.body;
		const product = await Product.create({
			name,
			price,
			quantity,
			imgUrl,
			description,
		});
		res.status(201).json(product);
		if (product) {
			console.log("this user is an admin")
            res.send(product);
        };
	} catch (err) {
		next(err);
	}
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (err) {
		next(err);
	}
});

// PUT /api/products/:id
router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, price, quantity, imgUrl, description } = req.body;
		const product = await Product.findByPk(id);
		if (product) {
			product.name = name;
			product.price = price;
			product.quantity = quantity;
			product.imgUrl = imgUrl;
			product.description = description;
			await product.save();
			res.json(product);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (err) {
		next(err);
	}
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);
		if (product) {
			await product.destroy();
			res.status(204).end();
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id, {});
		if (!product) {
			let err = new Error("No product found with that ID");
			err.status = 404;
			next(err);
		} else {
			res.send(product);
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
