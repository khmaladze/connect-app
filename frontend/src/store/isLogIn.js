import { createSlice } from "@reduxjs/toolkit";

const isLoggedInValue = JSON.parse(localStorage.getItem("user")) ? true : false;

const initialStateValue = {
  isLoggedIn: isLoggedInValue,
};

export const isLoggedInSlice = createSlice({
  name: "login",
  initialState: { value: initialStateValue },
  reducers: {
    userLogin: (state) => {
      state.value = true;
    },
    userLogOut: (state) => {
      state.value = false;
    },
  },
});

export const { userLogin, userLogOut } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
