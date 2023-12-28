"use client";

// planListSlicer.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, headers } from '@/helper/CONST';

// export const GetPlans = createAsyncThunk('GetPlans', async () => {
//     const response = await axios
//     .get(BASE_URL + '/patients/subscription', {
//         headers: headers(),
//     })
//     .then((res) => res.data.response.Items)
//     .catch((error) => {
//     });
//     return response;
// });

// const planListSlicer = createSlice({
//     name: 'planListSlicer',
//     initialState: {
//         value: [],
//         loading: false,
//     },
//     reducers: {},
//     extraReducers: {
//         [GetPlans.pending as any]: (state: { loading: boolean; }) => {
//             state.loading = true;
//         },
//         [GetPlans.fulfilled as any]: (state: { loading: boolean; value: any; }, { payload }: any) => {
//             state.loading = false;
//             state.value = payload;
//         },
//         [GetPlans.rejected as any]: (state: { loading: boolean; value: any; }, { payload }: any) => {
//             state.loading = false;
//             state.value = payload;
//         },
//     },
// });

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
// // export default planListSlicer.reducer;
export const planListReducer = planListSlicer.reducer;

