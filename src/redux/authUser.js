import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "../config/axios";

const initialState = {
  user: {},
  token: "",
  isloading: false,
  error: null,
  cart: [],
  initialValue: 0,
};

export const signup = createAsyncThunk("auth/signup", async (signupData) => {
  try {
    const res = await axios.post("/auth/signup", signupData);
    const data = await res.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
});

export const login = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const res = await axios.post("/auth/signin", loginData);
    const data = await res.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    clearCart(state, action) {
      state.cart = [];
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cart = state.cart.filter((product) => product.id !== productId);
    },
    updateCartQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const cartItem = state.cart.find((item) => item.product._id === productId);
      if (cartItem) {
        cartItem.quantityCount = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isloading = false;
      state.token = action.payload.data.token.token;
      state.user = action.payload.data;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isloading = false;
      state.token = action.payload.data.token.token;
      state.user = action.payload.data;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
    });
  },
});
export const { addToCart, removeFromCart, updateCartQuantity,clearCart } = authSlice.actions;

export default authSlice.reducer;
