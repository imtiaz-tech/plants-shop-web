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

  export const getProducts = createAsyncThunk("products/get-products", async () => {
    try {
      const res = await axios.get("/unauthrized/get-products");
      console.log("🚀 ~ getProducts ~ res:", res)
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  });



const initialState = {
    products: [],
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
          builder.addCase(getProducts.pending,(state)=>{
            state.isLoading=true;
          });
          builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.products=action.payload.data;      
          });
          builder.addCase(getProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
          });
    },
  });
  export default productSlice.reducer;