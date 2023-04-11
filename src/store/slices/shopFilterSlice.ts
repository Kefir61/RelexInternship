import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TSortDirection } from "./shopSlice";

interface FilterSliceState {
  filterSize: string;
  filterColor: string;
  sort: TSortDirection;
}

const initialState: FilterSliceState = {
  filterSize: "",
  filterColor: "",
  sort: "ASC",
};

const shopFilterSlice = createSlice({
  name: "shopFilter",
  initialState,
  reducers: {
    setFilterSize(state, action: PayloadAction<string>) {
      state.filterSize = action.payload;
    },
    setFilterColor(state, action: PayloadAction<string>) {
      state.filterColor = action.payload;
    },
    setSort(state, action: PayloadAction<TSortDirection>) {
      state.sort = action.payload;
    },
  },
});
export const selectFilter = (state: RootState) => state.shopFilter;

export const { setFilterSize, setFilterColor, setSort } =
  shopFilterSlice.actions;

export default shopFilterSlice.reducer;
