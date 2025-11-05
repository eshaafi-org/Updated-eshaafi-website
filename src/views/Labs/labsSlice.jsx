"use client";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "@/helper/CONST.ts";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getLabsHome = createAsyncThunk("getLabsHome", async () => {
  const response = await axios
    .get(`${BASE_URL}/lab/patients/labs`)
    .then((res) => res?.data?.response);
  return response;
});
//
export const labHomeSlice = createSlice({
  name: "labHomeSlice",
  initialState: {
    value: {
      Labs: [],
      PacakgeResponse: [],
    },
    loading: false, // Add this line to define the initial loading state
  },
  reducers: {},
  extraReducers: {
    [getLabsHome.pending]: (state) => {
      state.loading = true;
    },
    [getLabsHome.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.value = payload;
    },
    [getLabsHome.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const getLabHomeReducer = labHomeSlice.reducer;
