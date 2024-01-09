import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LabCartState {
  cart: any[]; // Assuming your cart items are strings. Adjust the type accordingly.
  totalAmount: number;
}

interface AddToCartAction {
  type: string; // You can use a more specific string or import action type constants
  payload: string; // Adjust the type according to your payload
}

const labCartSlicer = createSlice({
  name: "labCartSlicer",
  initialState: {
    cart: [],
    totalAmount: 0,
  } as LabCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.cart = [...state.cart, action.payload];
      state.totalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.productPrice),
        0
      );
    },
    addAmount: (state) => {
      state.totalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + item.productPrice,
        0
      );
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.barcode !== action.payload);
      state.totalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.productPrice),
        0
      );
    },
  },
});

export const { addToCart } = labCartSlicer.actions;
export const labCartReducer = labCartSlicer.reducer;
