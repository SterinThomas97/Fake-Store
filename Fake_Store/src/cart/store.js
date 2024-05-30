import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import authReducer from '../auth/authSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
}) 