import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialStateValue = {
  user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { value: initialStateValue },
  reducers: {
    logIn: (state, action) => {
      state.value = action.payload;
    },
    logOut: (state) => {
      state.value = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
