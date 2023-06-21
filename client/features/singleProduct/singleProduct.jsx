import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSingleProduct, selectProduct } from "./singleProductSlice.js";
import {
	addCartItem,
	updateCartItemQuantity,
	fetchCartItems,
	addCartItemLocal,
} from "../cart/cartSlice.js";


import EditProduct from "../addProducts/editProduct.jsx";


const SingleProduct = () => {
	const { id } = useParams();
	console.log('THE ID IN SINGLEPRODUCT', id)
	const dispatch = useDispatch();
	const product = useSelector(selectProduct);
	const cartItems = useSelector((state) => state.cart);
	const me = useSelector((state) => state.auth.me);


	useEffect(() => {
		dispatch(fetchSingleProduct(id));
	}, [dispatch, id]);

	useEffect(() => {
		dispatch(fetchCartItems(me.id));
	}, [dispatch, me.id]);

	const handleAddToCart = () => {
		const itemInCart = cartItems.find((item) => item.productId === product.id);

		if (itemInCart) {
			dispatch(
				updateCartItemQuantity({
					userId: me.id,
					productId: product.id,
					quantity: itemInCart.quantity + 1,
				})
			);
		} else {
			// If item is not in cart, add it to cart.

			// and if the user is not logged in

			if (!me.username) {
				dispatch(
					addCartItemLocal({
						productId: product.id,
						quantity: 1,
						Product: product,
					})
				);
				return;
			}
			dispatch(
				addCartItem({
					userId: me.id,
					productId: product.id,
					quantity: 1,
					Product: product,
				})
			);
		}
	};
	console.log("Product ID:", product.id);
	return (
		<div className="container">
			<div className="single-product-container">
				<img
					className="singleProductsImages"
					src={product.imgUrl}
					alt={product.title}
				/>
				<div className="singleProductRightSide">
					<h1 className="single-product-title">{product.name}</h1>
					<h2>Price: {product.price}</h2>
					<h2>Stock: {product.quantity}</h2>
					<p>{product.description}</p>
				</div>

					<button onClick={handleAddToCart}>Add to Cart</button>
			</div>
			<div className='editProductDiv'>
				<h1>Update Product</h1>
				<h2>Product ID: {product.id}</h2>
				

				<EditProduct productId={product.id}/>

			</div>
		</div>
	);
};

export default SingleProduct;
