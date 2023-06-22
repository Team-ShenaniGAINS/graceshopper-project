import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "./checkoutSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCartItems } from "../cart/cartSlice";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.Product.price;
    return acc + (price ? item.quantity * price : 0);
  }, 0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      name,
      email,
      address: `${streetNumber} ${street}, Apt ${apartmentNumber}, ${city}, ${state}, ${zipCode}`,
      creditCard,
      expDate,
      cvv,
      products: cartItems,
      totalPrice,
    };
    dispatch(createOrder(orderData));
    dispatch(clearCartItems());
    setOrderComplete(true);
  };

  return (
    <div className="checkoutWrapper">
      <h2>Checkout</h2>
      {orderComplete ? (
        <div>
          <p>Order Complete! Thank you for your purchase.</p>
          <Link to="/shop">Back to Shop</Link>
        </div>
      ) : (
        <form className="checkoutForm" onSubmit={handleFormSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Name and Last Name"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <label>Street Number</label>
            <input
              type="text"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="Street Number"
              required
            />
          </div>
          <div>
            <label>Apartment Number</label>
            <input
              type="text"
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              placeholder="Apartment Number"
            />
          </div>
          <div>
            <label>Street Name</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street Name"
              required
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              required
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Zip Code"
              required
            />
          </div>
          <div>
            <label>Credit Card</label>
            <input
              type="text"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
              maxLength={16}
              placeholder="Enter credit card number"
              required
            />
          </div>
          <div>
            <label>Expiration Date</label>
            <input
              type="text"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              maxLength={5}
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
              placeholder="Enter CVV"
              required
            />
          </div>

          {cartItems && cartItems.length > 0 ? (
            <div className="itemsWrapper">
              <h3>Cart Items</h3>
              {cartItems.map((item) => (
                <div className="itemWrapper" key={item.id}>
                  <img
                    className="checkoutImg"
                    src={item.Product.imgUrl}
                    alt={item.Product.name}
                  />
                  <p>{item.Product.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.Product.price * item.quantity}</p>
                </div>
              ))}
              <div>
                <strong>Total: ${totalPrice}</strong>
              </div>
            </div>
          ) : (
            <div>
              <p>Your cart is empty.</p>
            </div>
          )}
          <button className="checkoutButton" type="submit">
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
