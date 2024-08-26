import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice';
import productSlice from "./products"
export const store = configureStore({
    reducer:{
        auth: authSlice,
        products:productSlice
    }
})