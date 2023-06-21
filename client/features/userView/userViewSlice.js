import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async () => {
      try {
        const { data } = await axios.get("/api/users");
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

export const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  
  export const selectUsers = (state) => {
    return state.users;
  };
  
  export default usersSlice.reducer;
  