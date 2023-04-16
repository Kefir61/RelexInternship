import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { axiosOur } from "@utils";

export type TSortDirection = "ASC" | "DESC";
export type TStatus = "" | "LOADING" | "SUCCESS" | "ERROR";

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
  price: number;
  name: string;
  amount: number;
  colors: string[];
  sizes: string[];
  featured:boolean,
};

type ShopFetch = {
  contents: ShopProductItem[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  colors: string[];
  sizes: string[];
  totalElements: number;
  order: TSortDirection;
};

type FetchShopArgs = {
  pageSize: number;
  totalPages: number;
  color?: string;
  size?: string;
  order: TSortDirection;
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

type TDefaultParams = {
  currentPage: string;
  pageSize: string;
  totalPages: string;
  order: string;
  size?: string;
  color?: string;
};

export const fetchProducts = createAsyncThunk<ShopFetch, FetchShopArgs>(
  "shop/fetchShopStatus",
  async (requestParams) => {
    const defaultParams = <TDefaultParams>{
      currentPage: `${requestParams.currentPage}`,
      pageSize: `${requestParams.pageSize}`,
      totalPages: `${requestParams.totalPages}`,
      order: `${requestParams.order}`,
    };

    if (requestParams.color) {
      defaultParams["color"] = `${requestParams.color}`;
    }
    if (requestParams.size) {
      defaultParams["size"] = `${requestParams.size}`;
    }

    const params = new URLSearchParams(defaultParams);
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
  pageSize: 8,
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
