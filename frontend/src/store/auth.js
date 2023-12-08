import { createSlice } from "@reduxjs/toolkit";

// Retrieve user information from local storage or set to null if not found
const user = JSON.parse(localStorage.getItem("user")) || null;

// Create the auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState: { user }, // Initialize with an object containing the user
  reducers: {
    // Action to update the user information upon login
    logIn: (state, action) => {
      state.user = action.payload; // Update the user property
    },
    // Action to clear the user information upon logout
    logOut: (state) => {
      state.user = null; // Clear the user property
    },
  },
});

// Export actions from the auth slice
export const { logIn, logOut } = authSlice.actions;

// Export the auth slice reducer
export default authSlice.reducer;
