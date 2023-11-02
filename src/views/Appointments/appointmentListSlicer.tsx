"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  filterValue: "",
};

export const appointmentListSlice = createSlice({
  name: "appointmentListSlice",
  initialState,
  reducers: {},
});

export const appointmentListReducer = appointmentListSlice.reducer;
