import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  fetchCartItems,
  updateCartItemQuantity,
  removeItemFromCart,
  fetchCartItemsLocal,
  removeItemFromCartLocal,
  clearCartItems,
} from "./cartSlice";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Checkout from '../checkout/Checkout';


const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart, shallowEqual);
  const userId = useSelector((state) => state.auth.me.id);

  useEffect(() => {
    if (!userId) {
      // fetch from local
      dispatch(fetchCartItemsLocal());
    } else {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  const handleDeleteItem = (productId) => {
    if (!userId) {
      dispatch(removeItemFromCartLocal({ productId }));
      return;
    }
    dispatch(removeItemFromCart({ userId, productId }));
  };

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
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
      <table className="cartTable">
        <tbody className="cartItemContainer">
          {cartItems.map((item) => {
            const product = item.Product ? item.Product : item;
            return (
              <tr key={item.id}>
                <td className="cart-product-row">
                  <img
                    className="cart-image"
                    src={product.imgUrl}
                    alt={product.name}
                  />
                  <div className="cart-inner-product-row">
                    <p className="cart-product-title">{product.name}</p>
                    <div className="cart-quanity">
                      <td>
                        <select
                          value={quantities[product.id] || item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            handleQuantityChange(product.id, newQuantity);
                          }}
                        >
                          {[...Array(10).keys()].map((value) => {
                            const realValue = value + 1;
                            return (
                              <option key={realValue} value={realValue}>
                                {realValue}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>${product.price * (quantities[product.id] || item.quantity)}</td>
                    </div>
                    <td>
                      <button onClick={() => handleDeleteItem(product.id)}>
                        <i className="fa-solid fa-trash-can"></i>❌
                      </button>
                    </td>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="total">
            <td>
              <strong>Total: ${totalPrice}</strong>
            </td>
            <td className="checkout-btn">
              <Link to="/checkout">
                <button disabled={cartItems.length === 0}>Checkout</button>
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  };


  return (
    <>
      <div className="cart-container">{renderCartItems()}</div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Cart;