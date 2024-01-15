import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isTemplateExpression } from "typescript";

interface LabCartState {
  cart: any[];
  totalAmount: number;
}

interface AddToCartAction {
  type: string;
  payload: string;
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
        (accumulator, item) => accumulator + parseInt(item.totalPrice),
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
    addQuantity: (state, action) => {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.barcode === action.payload.barcode) {
          cartItem.totalPrice = action.payload.totalPrice
          return {
            ...cartItem,
            quantity: action.payload.quantity,
          }
        } else return cartItem
      })
      state.totalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.totalPrice),
        0
      );
    }
  },
});

export const { addToCart } = labCartSlicer.actions;
export const labCartReducer = labCartSlicer.reducer;
