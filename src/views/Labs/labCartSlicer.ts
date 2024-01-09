import { createSlice } from '@reduxjs/toolkit';

const labCartSlicer = createSlice({
    name: 'labCartSlicer',
    initialState: {
        value: [] as any[],
    },
    reducers: {
        addToCart: (state, action) => {
            state.value = [...state.value, action.payload];
        },
    },
});

export const { addToCart } = labCartSlicer.actions;
// export default cartSlice.reducer;
export const labCartReducer = labCartSlicer.reducer;
