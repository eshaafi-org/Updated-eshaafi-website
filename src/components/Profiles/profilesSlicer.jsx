"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, headers } from "@/helper/CONST.ts";
import axios from "axios";
// thunk
export const getProfilesData = createAsyncThunk("getProfilesData", async () => {
  const response = await axios
    .get(`${BASE_URL}/patients/profile?device=web`, {
      headers: headers(),
    })
    .then((res) => res.data?.response?.data ?? res.data?.response);
  return response;
});

// profiles
export const getProfilesSlice = createSlice({
  name: "getProfilesSlice",
  initialState: {
    profiles: [],
    loading: false,
  },
  reducers: {
    updateProfiles: (state, action) => {
      state.profiles = [action.payload.self, ...action.payload.profiles];
    },
  },
  extraReducers: {
    [getProfilesData.pending]: (state) => {
      state.loading = true;
    },
    [getProfilesData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.profiles = [payload.self, ...(payload.profiles ?? [])].filter(Boolean);
      }
    },
    [getProfilesData.rejected]: (state) => {
      state.loading = false;
    },
  },
});
// exports
export const getProfilesListReducer = getProfilesSlice.reducer;
