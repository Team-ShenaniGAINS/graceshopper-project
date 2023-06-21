import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'checkout/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/checkout/order', orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
