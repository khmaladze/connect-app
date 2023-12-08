import { createSlice } from "@reduxjs/toolkit";

// Retrieve user information from local storage or set to null if not found
const user = JSON.parse(localStorage.getItem("user")) || null;

// Define initial state for the auth slice
const initialStateValue = {
  user,
};

// Create the auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState: { value: initialStateValue },
  reducers: {
    // Action to update the user information upon login
    logIn: (state, action) => {
      state.value = action.payload;
    },
    // Action to clear the user information upon logout
    logOut: (state) => {
      state.value = null;
    },
  },
});

// Export actions from the auth slice
export const { logIn, logOut } = authSlice.actions;

// Export the auth slice reducer
export default authSlice.reducer;
