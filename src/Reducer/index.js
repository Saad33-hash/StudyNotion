
import authReducer from "../Slices/authSlice"
import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../Slices/ProfileSlice"
import cartReducer from "../Slices/cartSlice"
const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer
});

export default rootReducer