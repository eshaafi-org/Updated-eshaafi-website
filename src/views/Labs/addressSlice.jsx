
"use client";

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, headers } from "@/helper/CONST.ts";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getAddress = createAsyncThunk("getAddress", async () => {
    const response = await axios
        .get(`${BASE_URL}/lab/patients/labs/address`, {
            headers: headers(),
        })
        .then((res) => res?.data?.response.Items);
    return response;
});
//
export const addressSlice = createSlice({
    name: "addressSlice",
    initialState: {
        value: [],
        loading: false, // Add this line to define the initial loading state
    },
    reducers: {
        editAddress: (state, action) => {
            const { item, values } = action.payload;
            state.value = state.value.map(prevItem => {
                if (prevItem.aId === item.aId) {
                    return {
                        ...prevItem,
                        area: values.city !== prevItem.area ? values.city : prevItem.area,
                        landMark: values.landMark !== prevItem.landMark ? values.landMark : prevItem.landMark,
                        address: values.address !== prevItem.address ? values.address : prevItem.address,
                    };
                } else {
                    return prevItem;
                }
            });
        },
        deleteAddress: (state, action) => {
            const { aId } = action.payload;
            state.value = state.value.filter(item => item.aId !== aId);
        },
        addAddress: (state, action) => {
            const { data } = action.payload;
            state.value.push(data);
        },
    },
    extraReducers: {
        [getAddress.pending]: (state) => {
            state.loading = true;
        },
        [getAddress.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
        },
        [getAddress.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const getAddressReducer = addressSlice.reducer;
