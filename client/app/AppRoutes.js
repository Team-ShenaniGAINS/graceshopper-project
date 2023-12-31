import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import Products from '../features/products/Products';
import SingleProduct from '../features/singleProduct/singleProduct.jsx';
import { me } from './store';
import Cart from "../features/cart/Cart";

import Checkout from '../features/checkout/Checkout';

import CreateProduct from '../features/addProducts/addProduct.jsx';
import UserView from '../features/userView/userView.jsx';


/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (

		<div>
			{isLoggedIn ? (
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/shop" element={<Products />} />
					<Route path="/products/:id" element={<SingleProduct />} />
        			<Route path="/checkout" element={<Checkout />} />
        			{isAdmin && <Route path='/createProduct/' element={<CreateProduct />} />}
        			{isAdmin && <Route path='/users' element={<UserView />} />}
				</Routes>

			) : (
				<Routes>
					<Route
						path="/*"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/login"
						element={<AuthForm name="login" displayName="Login" />}
					/>
					<Route
						path="/signup"
						element={<AuthForm name="signup" displayName="Sign Up" />}
					/>
					<Route path="/shop" element={<Products />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/products/:id" element={<SingleProduct />} />
					<Route path="/checkout" element={<Checkout />} />
				</Routes>
			)}
		</div>
	);
};

export default AppRoutes;