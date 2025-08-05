import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  isEditing: false,
  videoData: {},
};

export const videoEditingSlice = createSlice({
  name: "videoEditing",
  initialState,
  reducers: {
    toggleEdit:(state,action)=>{
        state.isEditing=!state.isEditing;
      if (state.isEditing) {
        state.videoData = action.payload;
      } else {
        state.videoData = {}; 
      }
    }
  },
});

export const { toggleEdit } = videoEditingSlice.actions;

export default videoEditingSlice.reducer;
