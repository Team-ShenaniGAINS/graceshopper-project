import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct",
    async (productId) => {
        const { data } = await axios.get(
            `/api/products/${productId}`
        )
        return data;
    }
)

export const productSlice = createSlice({
    name: "product",
    initialState: {},
    extraReducers: (builder) => {
      builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  export const selectProduct = (state) => state.product;
  
  export default productSlice.reducer;