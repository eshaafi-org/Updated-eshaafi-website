"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
};

export const loginModalSlice = createSlice({
  name: "loginModalSlice",
  initialState,
  reducers: {
    open: (state, action) => {
      state.modal = true;
    },
    close: (state, action) => {
      state.modal = false;
    },
  },
});

export const loginModalReducer = loginModalSlice.reducer;
