import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const getCategories = createAsyncThunk("products/get-categories", async (res,{ rejectWithValue }) => {
  try {
    const res = await axios.get("/unauthrized/get-categories");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getProducts = createAsyncThunk("products/get-products", async (data,{ rejectWithValue }) => {
  try {
    const res = await axios.get("/unauthrized/get-products", {
      params: {
        perpage: data.recordsPerPage,
        pageno: data.currentPage,
        searchProduct: data.searchProduct,
        selectCategory: data.selectCategory,
        sortBy: data.sortBy,
      },
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getSingleProduct = createAsyncThunk("product/get-single-product", async (data,{ rejectWithValue }) => {
  try {
    const res = await axios.get(`/unauthrized/get-single-product/${data}`)
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addOrder = createAsyncThunk("products/add-order", async (data, { getState,rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const res = await axios.post("/orders/add-order", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getProductsByCategory = createAsyncThunk("product/get-products-by-category", async (data,{ rejectWithValue }) => {
  try {
    const res = await axios.get(`/unauthrized/get-products-by-category/${data}`)
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});



const initialState = {
  order:[],
  product:{},
  products: [],
  ProductsByCategory:[],
  productsCount: 0,
  categories: [],
  isLoading: false,
  isLoadingSingleProduct:false,
  isLoadingOrder:false,
  isLoadingProducts: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
      state.error = action.payload;
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
      state.isLoadingProducts = false;
      state.error = action.payload;
    });
    builder.addCase(getSingleProduct.pending,(state)=>{
      state.isLoadingSingleProduct=true;
    });
    builder.addCase(getSingleProduct.fulfilled,(state,action)=>{
      state.isLoadingSingleProduct=false;
      state.product=action.payload.data;
    });
    builder.addCase(getSingleProduct.rejected,(state,action)=>{
     state.isLoadingSingleProduct=false;
     state.error = action.payload;
    });
    builder.addCase(addOrder.pending,(state) =>{
      state.isLoadingOrder=true;
    });
    builder.addCase(addOrder.fulfilled,(state,action) =>{
      state.isLoadingOrder=false;
      state.order=action.payload.data;
    });
    builder.addCase(addOrder.rejected,(state,action) => {
      state.isLoadingOrder=false;
      state.error = action.payload;
    })
    builder.addCase(getProductsByCategory.pending,(state) =>{
      state.isLoadingOrder=true;
    });
    builder.addCase(getProductsByCategory.fulfilled,(state,action) =>{
      state.isLoadingOrder=false;
      state.ProductsByCategory=action.payload;
    });
    builder.addCase(getProductsByCategory.rejected,(state,action) => {
      state.isLoadingOrder=false;
      state.error = action.payload;
    })
  },
});
export default productSlice.reducer;
