//ConfigureStore simplifies the process of creating a Redux store.
//combineReducers function allows you to combine multiple reducer functions into a single function that can be passed to the Redux store.
import { configureStore ,combineReducers} from '@reduxjs/toolkit';
import authSlice from './authUser';
import productSlice from "./products"
// REHYDRATE allows the application to restore the user's previous state, including data, authentication status, and other application state
// persistStore allows you to save the Redux store's state to a persistent storage medium, such as local storage
// FLUSH allows the application to remove the state from store
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
  //logger powerful tool that allows you to visualize the flow of actions, state changes, and errors in your Redux application
  import logger from 'redux-logger'

const persistConfig = {
  key: "auth",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);
const rootReducer = combineReducers({ auth:persistedReducer, products: productSlice });
//ConfigureStore simplifies the process of creating a Redux store.
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