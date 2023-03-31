import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface FilterSliceState {
  filterSize: string;
  filterColor: string;
  sort: string;
  currentPage: number;
}

const initialState: FilterSliceState = {
  filterSize: "",
  filterColor: "",
  sort: "",
  currentPage: 1,
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
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});
export const selectFilter = (state: RootState) => state.shopFilter;

export const {setFilterSize, setFilterColor, setSort, setPage} = shopFilterSlice.actions;

export default shopFilterSlice.reducer;
