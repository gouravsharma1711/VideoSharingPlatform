import { createSlice } from "@reduxjs/toolkit";

// Read from localStorage safely
const localHistory = localStorage.getItem("isHistory");
const initialState = {
  isHistoryOn: localHistory !== null ? JSON.parse(localHistory) : true,
};

const historySlice = createSlice({
  name: "isHistory",
  initialState,
  reducers: {
    toggleisHistoryStatus: (state) => {
      const newStatus = !state.isHistoryOn;
      localStorage.setItem("isHistory", JSON.stringify(newStatus));
      state.isHistoryOn = newStatus;
    },
  },
});

export const { toggleisHistoryStatus } = historySlice.actions;
export default historySlice.reducer;
