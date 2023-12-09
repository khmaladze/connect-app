import { createSlice } from "@reduxjs/toolkit";

// Retrieve user information from local storage or set to null if not found
const user = JSON.parse(localStorage.getItem("user")) || null;

// Create the profileImage slice
export const profileImageSlice = createSlice({
  name: "profileImage",
  initialState: { profileImage: user ? user.profileImage || null : null }, // Check if user is not null before accessing profileImage
  reducers: {
    // Action to update the user information upon login
    loadProfileImage: (state, action) => {
      state.profileImage = action.payload; // Update the user property
    },
  },
});

// Export actions from the profileImage slice
export const { loadProfileImage } = profileImageSlice.actions;

// Export the profileImage slice reducer
export default profileImageSlice.reducer;
