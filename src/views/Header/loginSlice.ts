"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalValue: false,
  userAuth: "",
  drawer: false,
};

export const loginModalSlice = createSlice({
  name: "loginModalSlice",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },
    closeDrawer: (state) => {
      state.drawer = false;
    },
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
    signIn: (state) => {
      state.drawer = true;
      state.modalValue = true;
    },
  },
});

export const loginModalReducer = loginModalSlice.reducer;
