"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalValue: false,
  userAuth: "",
};

export const loginModalSlice = createSlice({
  name: "loginModalSlice",
  initialState,
  reducers: {
    open: (state) => {
      state.modalValue = true;
    },
    close: (state) => {
      state.modalValue = false;
    },
    setAuth: (state, action) => {
      state.userAuth = action.payload;
    },
    clearAuth: (state) => {
      state.userAuth = "";
    },
  },
});

export const loginModalReducer = loginModalSlice.reducer;
