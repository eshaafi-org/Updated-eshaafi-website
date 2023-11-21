"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./Features/Counter/counterSlice";
import { appointmentListReducer } from "@/views/Appointments/appointmentListSlicer";
import { loginModalReducer } from "@/views/Header/loginSlice";
import { appointmentPageReducer } from "@/views/Appointments/appointmentPageSlicer";

const rootReducer = combineReducers({
  appointmentListReducer,
  loginModalReducer,
  appointmentPageReducer,
  //   counter: counterReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
