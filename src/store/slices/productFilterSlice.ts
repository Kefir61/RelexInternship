import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductFilterSliceState {
  filterSize: string;
  filterColor: string;
  amountToCart: number;
}

const initialState: ProductFilterSliceState = {
  filterSize: null,
  filterColor: null,
  amountToCart: 1,
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setProductFilterSize(state, action: PayloadAction<string>) {
      state.filterSize = action.payload;
    },
    setProductFilterColor(state, action: PayloadAction<string>) {
      state.filterColor = action.payload;
    },
    setAmountToCart(state, action: PayloadAction<number>) {
      state.amountToCart = action.payload;
    },
  },
});
export const selectFilterProduct = (state: RootState) => state.productFilter;

export const { setProductFilterSize, setProductFilterColor,setAmountToCart } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
