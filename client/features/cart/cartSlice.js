import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchItems",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/cart/${userId}/remove`, { data: { productId } });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/cart/${userId}/update`, {
        productId,
        quantity,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      return state.filter((item) => item.Product.id !== action.payload);
    });
    builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      const index = state.findIndex(
        (item) => item.Product.id === action.payload.ProductId
      );
      if (index !== -1) {
        state[index].quantity = action.payload.quantity;
      }
    });
  },
=======
	"cart/fetchItems",
	async (userId) => {
		const { data } = await axios.get(`/api/cart/${userId}`);
		return data;
	}
);

export const addItemToCart = createAsyncThunk(
	"cart/addItem",
	async ({ userId, productId }) => {
		const { data } = await axios.post(`/api/cart/${userId}/add`, { productId });
		return data;
	}
);

export const updateCartItemQuantity = createAsyncThunk(
	"cart/updateItemQuantity",
	async ({ userId, productId, quantity }) => {
		const { data } = await axios.put(`/api/cart/${userId}/update`, {
			productId,
			quantity,
		});
		return data;
	}
);

export const removeItemFromCart = createAsyncThunk(
	"cart/removeItem",
	async ({ userId, productId }) => {
		await axios.delete(`/api/cart/${userId}/remove`, { data: { productId } });
		return productId;
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCartItems.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(addItemToCart.fulfilled, (state, action) => {
			state.push(action.payload);
		});
		builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
			const index = state.findIndex(
				(item) => item.Product.id === action.payload.ProductId
			);
			if (index !== -1) {
				state[index].quantity = action.payload.quantity;
			}
		});
		builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
			return state.filter((item) => item.ProductId !== action.payload);
		});
	},
});

export default cartSlice.reducer;
