import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      console.log("API Response:", data);
      const productsArr = Object.values(data);
      return productsArr;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addProductAsync = createAsyncThunk(
  "products/createProduct",
  async ({ name, price, imgUrl, quantity, description }) => {
    const { data } = await axios.post("/api/products", {
      name,
      price,
      imgUrl,
      quantity,
      description,
    });
    return data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    const { data } = await axios.delete(`/api/products/${productId}`);
    return data;
  }
);

export const editProductAsync = createAsyncThunk(
  "products/editProduct",
  async ({ productId, name, price, imgUrl, quantity, description }) => {
    const { data } = await axios.put(`/api/products/${productId}`, {
      name,
      price,
      quantity,
      imgUrl,
      description,
    });
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      const newState = state.filter(
        (products) => products.id !== action.payload.id
      );
      return newState;
    });
    builder.addCase(editProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectProducts = (state) => {
  return state.products;
};

export default productsSlice.reducer;
