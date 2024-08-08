import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    isloading: false,
    error: null,
  };

  export const adduser = createAsyncThunk(
    "auth/adduser",
    async (userData) => {
      try {
        const res = await axios.post("http://localhost:3001/Register", userData);
        const data = await res.data;
        return data;
      } catch (error) {
        return error.response.data;
      }
    }
  );

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
      builder.addCase(adduser.pending, (state) => {
        state.isloading = true;
      });
      builder.addCase(adduser.fulfilled, (state, action) => {
        state.isloading = false;
        state.user = action.payload;
      });
      builder.addCase(adduser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
    },
  });
  export default authSlice.reducer;