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

export const getProducts = createAsyncThunk("products/get-products", async (data) => {
  try {
    const res = await axios.get(`/unauthrized/get-products?perpage=${data.recordsPerPage}&pageno=${data.currentPage}&searchProduct=${data.searchProduct}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  products: [],
  productsCount: 0,
  categories: [],
  isLoading: false,
  isLoadingProducts: false,
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
      state.isLoadingProducts = false;
      state.error = action.error.message;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isLoadingProducts = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoadingProducts = false;
      state.products = action.payload.data;
      state.productsCount = action.payload.count;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export default productSlice.reducer;
