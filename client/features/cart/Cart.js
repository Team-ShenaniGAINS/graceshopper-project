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
    dispatch(removeItemFromCart({ userId, productId }));
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
      <table className="cartTable">
        {/* <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead> */}
        <tbody className="cartItemContainer">
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
                  <div className="cart-inner-product-row">
                    <p className="cart-product-title">{product.name}</p>
                    <div className="cart-quanity">
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>${product.price * item.quantity}</td>
                    </div>
                    <td>
                      <button onClick={() => handleDeleteItem(product.id)}>
                        <i className="fa-solid fa-trash-can"></i>❌
                      </button>
                      <button>➕</button>
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
              <Link to="/checkout">Checkout</Link>
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
