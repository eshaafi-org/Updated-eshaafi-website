import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LabCartState {
  cart: any[];
  packages: any[];
  totalAmount: number;
  subTotalAmount: number;
  packageAmount: number;
  subPackageAmount: number;
  cartAmount: number;
  subCartAmount: number;
}

const labCartSlicer = createSlice({
  name: "labCartSlicer",
  initialState: {
    cart: [],
    packages: [],
    cartAmount: 0,
    subCartAmount: 0,
    packageAmount: 0,
    subPackageAmount: 0,
    totalAmount: 0,
    subTotalAmount: 0,
  } as LabCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.cart = [...state.cart, action.payload];
      state.cartAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.totalPrice),
        0
      );
      state.subCartAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.subTotalPrice),
        0
      );
      state.totalAmount = state.cartAmount + state.packageAmount;
      state.subTotalAmount = state.subCartAmount + state.subPackageAmount;
    },
    addPackageToCart: (state, action: PayloadAction<string>) => {
      state.packages = [...state.packages, action.payload];
      state.packageAmount = state.packages.reduce(
        (accumulator, item) => accumulator + parseInt(item.charges),
        0
      );
      state.subPackageAmount = state.packages.reduce(
        (accumulator, item) => accumulator + parseInt(item.subCharges),
        0
      );
      state.totalAmount = state.cartAmount + state.packageAmount;
      state.subTotalAmount = state.subCartAmount + state.subPackageAmount;
    },
    addAmount: (state) => {
      state.totalAmount = state.cartAmount + state.packageAmount;
      state.subTotalAmount = state.subCartAmount + state.subPackageAmount;
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.barcode !== action.payload);
      state.packages = state.packages.filter((item) => item.pId !== action.payload);
      state.cartAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.totalPrice),
        0
      );
      state.subCartAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.subTotalPrice),
        0
      );
      state.packageAmount = state.packages.reduce(
        (accumulator, item) => accumulator + parseInt(item.charges),
        0
      );
      state.subPackageAmount = state.packages.reduce(
        (accumulator, item) => accumulator + parseInt(item.subCharges),
        0
      );
      state.totalAmount = state.cartAmount + state.packageAmount;
      state.subTotalAmount = state.subCartAmount + state.subPackageAmount;
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
        cartItem.totalPackPrice = action.payload.totalPackPrice
        cartItem.subTotalPackPrice = action.payload.subTotalPackPrice
        if (cartItem.pId === action.payload.pId) {
          return {
            ...cartItem,
            quantity: action.payload.quantity,
          }
        } else return cartItem
      })
      state.cartAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.totalPrice),
        0
      );
      state.subCartAmount = state.cart.reduce(
        (accumulator, item) => accumulator + parseInt(item.subTotalPrice),
        0
      );
      state.packageAmount = state.packages.reduce(
        (accumulator, item) => accumulator + parseInt(item.totalPackPrice),
        0
      );
      state.subPackageAmount = state.packages.reduce(
        (accumulator, item) => accumulator + parseInt(item.subTotalPackPrice),
        0
      );
      state.totalAmount = state.cartAmount + state.packageAmount;
      state.subTotalAmount = state.subCartAmount + state.subPackageAmount;
    },
    resetCartState: (state) => {
      state.cart = [];
      state.packages = [];
      state.cartAmount = 0;
      state.subCartAmount = 0;
      state.packageAmount = 0;
      state.subPackageAmount = 0;
      state.totalAmount = 0;
      state.subTotalAmount = 0;
    },
  },
});

export const { addToCart } = labCartSlicer.actions;
export const { addPackageToCart } = labCartSlicer.actions;
export const labCartReducer = labCartSlicer.reducer;
