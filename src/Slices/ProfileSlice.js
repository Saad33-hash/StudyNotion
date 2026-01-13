
import { createSlice } from "@reduxjs/toolkit";

//set intisla state 
const initialState={
    user:null,
}

//creating a slice
const profileSlice=createSlice({
    name:"profile",
  initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
        },
        setLogoutUser(state){
            state.user=null
        }
    },
});

export const {setUser}=profileSlice.actions;
export const {setLogoutUser}=profileSlice.actions;
export default profileSlice.reducer
