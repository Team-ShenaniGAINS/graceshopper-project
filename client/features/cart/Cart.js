import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchCartItems,
	updateCartItemQuantity,
	removeItemFromCart,
} from "./cartSlice";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";

const Cart = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart);
	const userId = useSelector((state) => state.auth.me.id);

	useEffect(() => {
		dispatch(fetchCartItems(userId));
	}, [dispatch, userId]);

	const handleDeleteItem = (productId) => {
		dispatch(removeItemFromCart({ userId: userId,productId: productId }));
	};

	const handleQuantityChange = (productId, newQuantity) => {
		if (newQuantity > 0) {
			dispatch(
				updateCartItemQuantity({ userId, productId, quantity: newQuantity })
			);
		}
	};

	const totalPrice = cartItems.reduce((acc, item) => {
		const price = item.Product.price;
		return acc + (price ? item.quantity * price : 0);
	}, 0);

	const renderCartItems = () => {
		if (cartItems.length === 0) {
			return <div id="empty-cart">Your cart is empty</div>;
		}
		return (
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item) => {
						const product = userId && item.Product ? item.Product : item;
						return (
							<tr key={item.id}>
								<td className="cart-product-row">
									<img
										className="cart-image"
										src={product.imgUrl}
										alt={product.name}
									/>
									<p className="cart-product-title">{product.name}</p>
								</td>
								<td>
									<input
										type="number"
										value={item.quantity}
										min="1"
										className="cart-quanity"
										onChange={(e) =>
											handleQuantityChange(product.id, parseInt(e.target.value))
										}
									/>
								</td>
								<td className="cart-quanity">
									${product.price * item.quantity}
								</td>
								<td>
									<button onClick={() => handleDeleteItem(product.id)}>
										Remove
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
				<tfoot>
					<tr className="total">
						<td>
							<strong>Total Price:</strong>
						</td>
						<td></td>
						<td>
							<strong>${totalPrice}</strong>
						</td>
						<td className="checkout-btn">
							<Link to="/orderplaced">Checkout</Link>
						</td>
					</tr>
				</tfoot>
			</table>
		);
	};

	return (
		<>
			<div className="cart-container">
				<h1>Cart</h1>
				{renderCartItems()}
			</div>
			<footer><Footer /></footer>
		</>
	);
};

export default Cart;
