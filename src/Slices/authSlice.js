import { createSlice } from "@reduxjs/toolkit";

// Helper function to get clean token
const getTokenFromStorage = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  // Remove quotes if present (fixes old stored tokens)
  if (token.startsWith('"') && token.endsWith('"')) {
    const cleanToken = token.slice(1, -1);
    localStorage.setItem("token", cleanToken); // Save clean version
    return cleanToken;
  }
  return token;
};

const initialState = {
  token: getTokenFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      }
    },
    setlogout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setlogout } = authSlice.actions;
export default authSlice.reducer;