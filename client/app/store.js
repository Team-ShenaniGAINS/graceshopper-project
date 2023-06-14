import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productSlice.js";
import productReducer from "../features/singleProduct/singleProductSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
