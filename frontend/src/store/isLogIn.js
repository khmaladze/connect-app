import { createSlice } from "@reduxjs/toolkit";

// Check if user is logged in based on the presence of user information in local storage
const isLoggedInValue = !!JSON.parse(localStorage.getItem("user"));

// Define initial state for the isLoggedIn slice
const initialStateValue = {
  isLoggedIn: isLoggedInValue,
};

// Create the isLoggedIn slice
export const isLoggedInSlice = createSlice({
  name: "login",
  initialState: { value: initialStateValue },
  reducers: {
    // Action to set the user as logged in
    userLogin: (state) => {
      state.value = true;
    },
    // Action to set the user as logged out
    userLogOut: (state) => {
      state.value = false;
    },
  },
});

// Export actions from the isLoggedIn slice
export const { userLogin, userLogOut } = isLoggedInSlice.actions;

// Export the isLoggedIn slice reducer
export default isLoggedInSlice.reducer;
