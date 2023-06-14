import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productSlice.js";
import cartSlice from "../features/cart/cartSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart:cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
