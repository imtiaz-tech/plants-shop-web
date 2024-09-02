import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import authSlice from './authUser';
import productSlice from "./products"
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
import logger from 'redux-logger'

const persistConfig = {
  key: "auth",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);
const rootReducer = combineReducers({ auth:persistedReducer, products: productSlice });
const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(logger),
  });
  
  const persistor = persistStore(store);
  
  export { store, persistor };



  
// export const store = configureStore({
//     reducer:{
//         auth: authSlice,
//         products:productSlice
//     }
// })