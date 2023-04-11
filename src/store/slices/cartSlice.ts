import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getCart } from "../../utils/api/requests/cartRequest";
type CartItem = {
  id: number;
  mainImageId: number;
  price: number;
  amount: number;
  name: string;
  colors: string[];
  sizes: string[];
};

export const fetchCart = createAsyncThunk<any, any, { rejectValue: string }>(
  "cart/fetchCart",
  async function (_, { rejectWithValue }) {
    try {
      const response = await getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

interface cartItemProps {
  product: CartItem;
  quantity: number;
}

interface CartSliseState {
  cartList: cartItemProps[];
  loading: boolean;
  status: string | null;
  error: boolean;
  totalPrice: number;
}

const initialState: CartSliseState = {
  cartList: [
    {
      product: {
        id: 1,
        mainImageId: null,
        price: 20.0,
        amount: 5,
        name: "Название товара",
        colors: ["red", "blue", "orange"],
        sizes: ["XS", "S", "L", "XL"],
      },
      quantity: 1,
    },
    {
      product: {
        id: 2,
        mainImageId: null,
        price: 20.0,
        amount: 15,
        name: "Название товара",
        colors: [],
        sizes: [],
      },
      quantity: 1,
    },
  ],
  loading: false,
  status: null,
  error: false,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    countTotalPrice(state, action) {
      state.totalPrice = 0;
      state.cartList.map((item) => {
        if (item.product.id === action.payload.id) {
          item.quantity = action.payload.quantity;
        }
        state.totalPrice += item.quantity * item.product.price;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartList = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { countTotalPrice } = cartSlice.actions;
export const {} = cartSlice.actions;

export default cartSlice.reducer;
