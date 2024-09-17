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

export const signup = createAsyncThunk("auth/signup", async (signupData, { rejectWithValue }) => {
  try {
    const res = await axios.post("/auth/signup", signupData);
    const data = await res.data;
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    const res = await axios.post("/auth/signin", loginData);
    const data = await res.data;
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const changeUserPassword = createAsyncThunk(
  "auth/change-user-password",
  async (updata, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.patch("/auth/change-user-password", updata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeUserDetails = createAsyncThunk(
  "auth/change-user-details",
  async (updata, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.patch("/auth/change-user-details", updata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeUserAddressDetails = createAsyncThunk(
  "auth/change-user-address-details",
  async (data, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.patch("/auth/change-user-address-details", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
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
      state.token = action.payload.data?.token?.token;
      state.user = action.payload.data;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isloading = false;
      state.token = action.payload.data?.token?.token;
      state.user = action.payload.data;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    });
    builder.addCase(changeUserPassword.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      state.isloading = false;
      state.user = action.payload.data;
    });
    builder.addCase(changeUserPassword.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    });
    builder.addCase(changeUserDetails.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(changeUserDetails.fulfilled, (state, action) => {
      state.isloading = false;
      state.user = action.payload.data;
    });
    builder.addCase(changeUserDetails.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    });
    builder.addCase(changeUserAddressDetails.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(changeUserAddressDetails.fulfilled, (state, action) => {
      state.isloading = false;
      state.user = action.payload.data;
    });
    builder.addCase(changeUserAddressDetails.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    });
  },
});
export const { addToCart, removeFromCart, updateCartQuantity, clearCart, logout } = authSlice.actions;

export default authSlice.reducer;
