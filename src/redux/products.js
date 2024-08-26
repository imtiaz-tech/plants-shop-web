import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const getCategories = createAsyncThunk("products/get-categories", async () => {
    try {
      const res = await axios.get("/unauthrized/get-categories");
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  });

  


const initialState = {
    categories: [],
    isloading: false,
    error: null,
  };
  
  const productSlice = createSlice({
    name: "products",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload.data;
          });
          builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          });
    },
  });
  export default productSlice.reducer;