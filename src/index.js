import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import {Provider} from "react-redux"
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer";
import { Toaster } from "react-hot-toast";


const store=configureStore({
  reducer:rootReducer,
});

const token=localStorage.getItem("token");
const user=localStorage.getItem("user");

if(token && user){
  const {setToken}=require("./Slices/authSlice");
  const {setUser}=require("./Slices/ProfileSlice");

  store.dispatch(setToken(token));
  store.dispatch(setUser(JSON.parse(user)));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
     <App />
     <Toaster/>
    </BrowserRouter>
</Provider>   
  </React.StrictMode>
);
