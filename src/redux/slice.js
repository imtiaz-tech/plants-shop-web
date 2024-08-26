import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axios";

const initialState = {
    user: {},
    isloading: false,
    error: null,
  };

  export const signup = createAsyncThunk(
    "auth/signup",
    async (signupData) => {
      try {
        const res = await axios.post("/auth/signup", signupData);
        const data = await res.data;
        return data;
      } catch (error) {
        return error.response.data;
      }
    }
  );

  export const login = createAsyncThunk(
    "auth/login",
    async(loginData) => {
      try{
        const res = await axios.post ("/auth/signin",loginData);
        const data = await res.data;
        return data;
      }catch(error){
        return error.response.data
      }
    }
  )

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
      builder.addCase(signup.pending, (state) => {
        state.isloading = true;
      });
      builder.addCase(signup.fulfilled, (state, action) => {
        state.isloading = false;
        state.user = action.payload.data;
      });
      builder.addCase(signup.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
      });
      builder.addCase(login.pending,(state)=>{
        state.isloading = true;
      });
      builder.addCase(login.fulfilled,(state,action)=>{
        state.isloading = false;
        state.user = action.payload.data;
      });
      builder.addCase(login.rejected,(state,action)=>{
        state.isloading = false;
        state.error =action.error.message;
      })
    },
  });
  export default authSlice.reducer;