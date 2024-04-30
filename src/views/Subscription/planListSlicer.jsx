"use client"; 
import { BASE_URL, headers } from "@/helper/CONST";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getSubscriptionPlans = createAsyncThunk("getSubscriptionPlans", async () => {
  const response = await axios
    .get(BASE_URL + "/patients/subscription", {
      headers: headers(),
    })
    .then((res) => res?.data?.response.Items);
  return response;
});

const planListSlicer = createSlice({
  name: "planListSlicer",
  initialState: {
    value: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getSubscriptionPlans.pending]: (state) => {
      state.loading = true;
    },
    [getSubscriptionPlans.fulfilled]: (state, {payload} ) => {
      state.loading = false;
      state.value = payload;
    },
    [getSubscriptionPlans.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// // export default planListSlicer.reducer;
export const planListReducer = planListSlicer.reducer;
