import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageCount: 0,
};

const messageSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeCount: (state, action) => {
      state.messageCount = action.payload;
    },
    incrementCount: (state, action) => {
      state.messageCount += 1;
    },
    decrementCount: (state, action) => {
      state.messageCount -= 1;
    },
  },
});

export const { initializeCount, incrementCount, decrementCount } =
  messageSlice.actions;

export default messageSlice.reducer;
