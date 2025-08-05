import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const UserSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      state.userData = action.payload;
    },
    logOutUser: (state) => {
      localStorage.removeItem("userData");
      state.userData = null;
    },
  },
});

export const { logOutUser, loggedInUser } = UserSlice.actions;

export default UserSlice.reducer;
