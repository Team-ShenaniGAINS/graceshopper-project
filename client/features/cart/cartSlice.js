import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
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
	async ({ userId, productId, quantity = 1, Product }, { rejectWithValue, getState }) => {
		try {
			const { cart } = getState();
			const itemIndex = cart.findIndex(item => item.Product.id === productId);

			if (itemIndex !== -1) {
				const item = cart[itemIndex];
				const newQuantity = item.quantity + quantity;
				const { data } = await axios.put(`/api/cart/${userId}/update`, { productId, quantity: newQuantity });
				return data;
			} else {
				const { data } = await axios.post(`/api/cart`, { userId, productId, quantity, Product });
				return data;
			}
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
			const { data } = await axios.put(`/api/cart/${userId}/update`, { productId, quantity });
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const selectTotalQuantity = createSelector(
	(state) => state.cart,
	(cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
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
            const index = state.findIndex((item) => item.Product.id === action.payload.ProductId);
            if (index !== -1) {
                state[index].quantity = action.payload.quantity;
            }
        });
		builder.addCase(addCartItem.fulfilled, (state, action) => {
			const itemIndex = state.findIndex(item => item.Product.id === action.payload.ProductId);

			if (itemIndex !== -1) {
				state[itemIndex].quantity = action.payload.quantity;
			} else {
				state.push(action.payload);
			}
		});
	},
});

export default cartSlice.reducer;
