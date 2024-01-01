"use client";

// planListSlicer.ts
import { createSlice } from '@reduxjs/toolkit';

const planListSlicer = createSlice({
    name: 'planListSlicer',
    initialState: {
        value: [],
        loading: false,
        error: null,
    },
    reducers: {
        requestPlans: (state) => {
            state.loading = true;
            state.error = null;
        },
        receivePlans: (state, action) => {
            state.loading = false;
            state.value = action.payload;
        },
        plansError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { requestPlans, receivePlans, plansError } = planListSlicer.actions;
export const planListReducer = planListSlicer.reducer;

