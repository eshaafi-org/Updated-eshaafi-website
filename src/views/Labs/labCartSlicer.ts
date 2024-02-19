import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LabCartState {
  cart: any[];
  packages: any[];
  totalAmount: number;
  subTotalAmount: number;
}

const labCartSlicer = createSlice({
  name: "labCartSlicer",
  initialState: {
    cart: [],
    totalAmount: 0,
    subTotalAmount: 0,
    packages: [],
  } as LabCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.cart = [...state.cart, action.payload];
      state.totalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.totalPrice),
        0
      );
      state.subTotalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.subTotalPrice),
        0
      );
    },
    addPackageToCart: (state, action: PayloadAction<string>) => {
      state.packages = [...state.packages, action.payload];
    },
    addAmount: (state) => {
      state.totalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + item.productPrice,
        0
      );
      state.subTotalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + item.subPrice,
        0
      );
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.barcode !== action.payload);
      state.packages = state.packages.filter((item) => item.pId !== action.payload);
      state.totalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.productPrice),
        0
      );
      state.subTotalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.subPrice),
        0
      );
    },
    addQuantity: (state, action) => {
      state.cart = state.cart.map((cartItem) => {
        if (cartItem.barcode === action.payload.barcode) {
          cartItem.totalPrice = action.payload.totalPrice
          cartItem.subTotalPrice = action.payload.subTotalPrice
          return {
            ...cartItem,
            quantity: action.payload.quantity,
          }
        } else return cartItem
      })
      state.packages = state.packages.map((cartItem) => {
        if (cartItem.pId === action.payload.pId) {
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
      state.subTotalAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.subTotalPrice),
        0
      );
    }
  },
});

export const { addToCart } = labCartSlicer.actions;
export const { addPackageToCart } = labCartSlicer.actions;
export const labCartReducer = labCartSlicer.reducer;
