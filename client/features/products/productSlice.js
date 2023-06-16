import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
	"fetchAllProducts",
	async () => {
		try {
			const { data } = await axios.get("/api/products");
			
			return data;
		} catch (err) {
			console.log(err);
		}
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
	},
});

export const selectProducts = (state) => {
	return state.products;
};

export default productsSlice.reducer;
