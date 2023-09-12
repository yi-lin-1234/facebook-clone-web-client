import { createSlice } from "@reduxjs/toolkit";

// userSlice of the global state, contains user related actions and reducers
export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    // Set a new user
    setUser: (state, action) => {
      state.value = action.payload;
    },
    // Remove the current user
    removeUser: (state) => {
      state.value = null;
    },
  },
});

// Exporting the actions
export const { setUser, removeUser } = userSlice.actions;

// Exporting the reducer
export default userSlice.reducer;
