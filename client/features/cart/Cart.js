
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems, updateCartItemQuantity, removeItemFromCart } from "./cartSlice";
import { Link } from "react-router-dom";
// import Footer from "./Footer";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const userId = useSelector((state) => state.auth.me.id);
  
    useEffect(() => {
      dispatch(fetchCartItems(userId));
    }, [dispatch, userId]);

    const handleDeleteItem = (productId) => {
      dispatch(removeItemFromCart({ userId, productId }));
    };

    const handleQuantityChange = (productId, newQuantity) => {
      if (newQuantity > 0) {
        dispatch(updateCartItemQuantity({ userId, productId, quantity: newQuantity }));
      }
    };

    const totalPrice = cartItems.reduce((acc, item) => {
      const price = item.Product.Price;
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
										src={product.ImageUrl}
										alt={product.Title}
									/>
									<p className="cart-product-title">{product.Title}</p>
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
									${product.Price * item.quantity}
								</td>
								<td>
									<button onClick={() => handleDeleteItem(product.id)}>
										<i className="fa-solid fa-trash-can"></i>
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
			<footer>
				{/* <Footer /> */}
			</footer>
		</>
	);
    
}

export default Cart;
=======
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeItemFromCart, updateLocalStorageCartItemQuantity } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const loggedInCartItems = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.me.id);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
      setCartItems(loggedInCartItems);
    } else {
      setCartItems(getLocalStorageCart());
    }
  }, [dispatch, userId, loggedInCartItems]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = userId && item.Product ? item.Product.Price : item.Price;
    return acc + (price ? item.quantity * price : 0);
  }, 0);

  const handleDeleteItem = (productId) => {
    if (userId) {
      dispatch(removeItemFromCart({ userId, productId }));
    } else {
      removeLocalStorageCartItem(productId);
      setCartItems(getLocalStorageCart());
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (!newQuantity) {
      return;
    }
    if (userId) {
      dispatch(updateCartItemQuantity({ userId, productId, quantity: newQuantity }));
    } else {
      updateLocalStorageCartItemQuantity(productId, newQuantity);
      setCartItems(getLocalStorageCart());
    }
  };

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
                  <img className="cart-image" src={product.ImageUrl} alt={product.Title} />
                  <p className="cart-product-title">{product.Title}</p>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="cart-quanity"
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  />
                </td>
                <td className="cart-quanity">
                  ${product.Price * item.quantity}
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(product.id)}>
                    <i className="fa-solid fa-trash-can"></i>
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
      <footer>
        <Footer />
      </footer>
    </>
 
  )
}

export default Cart 

