import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { axiosOur } from "@utils";

export type TSortDirection = "ASC" | "DESC";
type TStatus = "" | "LOADING" | "SUCCESS" | "ERROR";

type TProductVarieties = {
  nameProduct: string;
  id: number;
  color?: string;
  size?: string;
  quantity: number;
  mainImageId: number;
  price: number;
};

export type ShopProductItem = {
  id: number;
  description: string;
  mainImageId: number;
  productImageIds: number[];
  productVarieties: TProductVarieties[];
  featured: boolean;
  price: number;
  name: string;
  amount: number;
  colors: string[];
  sizes: string[];
};

type ShopFetch = {
  contents: ShopProductItem[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  colors: string[];
  sizes: string[];
  totalElements: number;
  descending: boolean;
};

type FetchShopArgs = {
  pageSize: number;
  totalPages: number;
  color: string;
  size: string;
  descending: TSortDirection;
  currentPage: number;
};

interface ShopSliceState {
  list: ShopProductItem[];
  colors: string[];
  sizes: string[];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  totalPages: number;
  status: TStatus;
}

export const fetchProducts = createAsyncThunk<ShopFetch, FetchShopArgs>(
  "shop/fetchShopStatus",
  async (requestParams) => {
    const defaultParams = requestParams.color
      ? { color: `${requestParams.color}` }
      : {};
    const params = new URLSearchParams(
      requestParams.size
        ? {
            ...defaultParams,
            size: `${requestParams.size}`,
            currentPage: `${requestParams.currentPage}`,
            pageSize: `${requestParams.pageSize}`,
            totalPages: `${requestParams.totalPages}`,
            descending: `${requestParams.descending}`,
          }
        : {
            ...defaultParams,
            currentPage: `${requestParams.currentPage}`,
            pageSize: `${requestParams.pageSize}`,
            totalPages: `${requestParams.totalPages}`,
            descending: `${requestParams.descending}`,
          }
    );
    const { data } = await axiosOur.get<ShopFetch>(`/shop/products`, {
      params,
    });
    return data;
  }
);

const initialState: ShopSliceState = {
  list: [],
  colors: [],
  sizes: [],
  currentPage: 1,
  totalElements: 0,
  pageSize: 0,
  totalPages: 20,
  status: "LOADING",
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "LOADING";
      state.list = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload.contents;
      state.currentPage = action.payload.currentPage;
      state.pageSize = action.payload.pageSize;
      state.colors = action.payload.colors;
      state.sizes = action.payload.sizes;
      state.totalElements = action.payload.totalElements;
      state.status = "SUCCESS";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "ERROR";
      state.list = [];
    });
  },
});
export const selectShop = (state: RootState) => state.shop;

export const { setPage } = shopSlice.actions;

export default shopSlice.reducer;
