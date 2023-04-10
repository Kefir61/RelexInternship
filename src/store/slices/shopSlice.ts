import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
type TSortDirection = "ASC" | "DESC";
type TStatus = "" | "LOADING" | "SUCCESS" | "ERROR";

export type ShopProductItem = {
  id: number;
  description: string;
  mainImageId: number;
  productImageIds: number[];
  productVarieties: object[];
  featured: boolean;
  price: number;
  name: string;
  amount: number;
  title: string;
  colors: string[];
  sizes: string[];
};

type ShopFetch = {
  products: ShopProductItem[];
  currentPage: number;
  pageSize: number;
  totalPages:number;
  color: string | null;
  size: string | null;
  filter: string | null;
  descending: boolean
}

type FetchShopArgs = {
  pageSize: number;
  totalPages: number;
  color: string;
  size: string;
  descending: boolean;
  currentPage: number;
  filter: string;
};

interface ShopSliceState {
  list: ShopProductItem[];
  loading: boolean;
  status: TStatus;
}

const axiosProduct = axios.create({
  baseURL: "https://07e8c250-9f0e-415c-81ff-2831f7637bc8.mock.pstmn.io",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

axiosProduct.interceptors.request.use((config) => {
  config.headers.Authorization =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImpvaG5kb2UiLCJpYXQiOjk5OTk5OTk5OSwiYXV0aG9yaXRpZXMiOlsiZW1wbG95ZWUiLCJzeXN0ZW1fYWRtaW5pc3RyYXRvciIsInN0b3JlX2FkbWluaXN0cmF0b3IiLCJldmVudF9hZG1pbmlzdHJhdG9yIiwiYWNjcnVhbF9hZG1pbmlzdHJhdG9yIiwiYnVkZ2V0X293bmVyIiwiYXVkaXRvciIsImV2ZW50X29yZ2FuaXplciJdfQ.sqjyo3YQSc-kGLoyyDRIYiHeDQu8nWJyhoMxMnMDC14";
  return config;
});

export const fetchProducts = createAsyncThunk<ShopFetch, FetchShopArgs>(
  "shop/fetchShopStatus",
  async (params) => {
    const {
      currentPage,
      pageSize,
      totalPages,
      color,
      descending,
      size,
      filter,
    } = params;
    const { data } = await axiosProduct.get<ShopFetch>(
      "/products"
    );
    return data;
  }
);

const initialState: ShopSliceState = {
  list: [],
  loading: false,
  status: "LOADING",
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "LOADING";
      state.list = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload.products;
      state.status = "SUCCESS";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "ERROR";
      state.list = [];
    });
  },
});
export const selectShop = (state: RootState) => state.shop;

export const {} = shopSlice.actions;

export default shopSlice.reducer;
