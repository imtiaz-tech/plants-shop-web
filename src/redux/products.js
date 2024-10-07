//createAsyncThunk will generate three Redux action creators using createAction : pending , fulfilled , and rejected
//createSlice simplifies the process of generating action creators and reducers.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";
// getCategories api used for show categories on  ShopCategories component
export const getCategories = createAsyncThunk("products/get-categories", async (res,{ rejectWithValue }) => {
  try {
    const res = await axios.get("/unauthrized/get-categories");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
// getProducts api used for show products on HomePlants,ShopGridStandard,Product component for show related category products
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
// getSingleProduct api used for show single product on Product component for show single product
export const getSingleProduct = createAsyncThunk("product/get-single-product", async (data,{ rejectWithValue }) => {
  try {
    const res = await axios.get(`/unauthrized/get-single-product/${data}`)
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
// addOrder api used for place order on checkout component 
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
// getProductsByCategory api used for show related product by category on Product component page 
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
    //state.categories used in ShopCategories component for show categories in list;
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
    //state.products used in HomePlants component,ShopGridStandard component,Product component for show products in list;
    //state.productsCount used in product component for pagination
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
    //state.product used in product component for show single product
    //state.isLoadingSingleProduct used in product component for show loading 
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
      // state.order=action.payload.data;
    });
    builder.addCase(addOrder.rejected,(state,action) => {
      state.isLoadingOrder=false;
      state.error = action.payload;
    })
    builder.addCase(getProductsByCategory.pending,(state) =>{
      state.isLoadingOrder=true;
    });
    //state.ProductsByCategory state used for show product by category on productGrid component page
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
