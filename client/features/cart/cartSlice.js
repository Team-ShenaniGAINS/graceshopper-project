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

export const addCartItem = createAsyncThunk(
	"cart/addCartItem",
	async ({ userId, productId, quantity, Product }, { rejectWithValue }) => {
		try {
			console.log("in redux>>>>", {
				userId,
				productId,
				quantity,
				Product,
			});
			const { data } = await axios.post(`/api/cart`, {
				userId,
				productId,
				quantity,
				Product,
			});
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

export const addToCart = createAsyncThunk(
    "cart/addItem",
    async ({ userId, productId, quantity = 1 }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`/api/cart/${userId}/add`, { productId, quantity });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

const cartSlice = createSlice({
<<<<<<< HEAD
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
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.push(action.payload);  // this assumes the backend returns the added item
    });
  },
=======
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
		builder.addCase(addCartItem.fulfilled, (state, action) => {});
	},
>>>>>>> 7013d2672db24f61c90467566bc94f7517d9463a
});

export default cartSlice.reducer;
