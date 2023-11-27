"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentPage: {},
  reschedule: false,
};

export const appointmentPageSlice = createSlice({
  name: "appointmentPageSlice",
  initialState,
  reducers: {
    appointment: (state, action) => {
      state.appointmentPage = action.payload;
      state.reschedule = true;
    },
    clearReducer: (state) => {
      state.appointmentPage = {};
    },
    rescheduleTrue: (state) => {
      state.reschedule = true;
    },
    rescheduleFalse: (state) => {
      state.reschedule = false;
    },
  },
});

export const appointmentPageReducer = appointmentPageSlice.reducer;
