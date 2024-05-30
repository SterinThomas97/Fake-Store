
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  authenticationKey: null,
  userData: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        console.log("inside login", action.payload)
      state.isLoggedIn = true;
      state.authenticationKey = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.authenticationKey = null;
    },
    setUserData : (state, action) => {
        state.userData = action.payload;
    }
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
