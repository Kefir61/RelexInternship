import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type TSortDirection = "ASC" | "DESC";
type TStatus = "" | "LOADING" | "SUCCESS" | "ERROR";

export type ShopProductItem = {
  id: number;
  imgUrl: string;
  price: number;
  amout: number;
  title: string;
  colors: string[];
  sizes: string[];
};

type FetchShopArgs = {
  filterSize: string;
  filterColor: string;
  sort: TSortDirection;
  currentPage: number;
};

interface ShopSliceState {
  list: ShopProductItem[];
  loading: boolean;
  status: TStatus;
}

export const fetchMenu = createAsyncThunk<ShopProductItem[], FetchShopArgs>(
  "shop/fetchShopStatus",
  async (params) => {
    const { filterSize, filterColor, sort, currentPage } = params;
    const { data } = await axios.get<ShopProductItem[]>(`url`);
    return data;
  }
);

const initialState: ShopSliceState = {
  list: [
    {
      id: 1,
      imgUrl: "",
      price: 20.0,
      amout: 5,
      title: "Название товара",
      colors: ["red", "blue", "orange"],
      sizes: ["XS", "S", "L", "XL"],
    },
    {
      id: 2,
      imgUrl: "",
      price: 20.0,
      amout: 15,
      title: "Название товара",
      colors: [],
      sizes: [],
    },
    {
      id: 3,
      imgUrl: "",
      price: 15.0,
      amout: 25,
      title: "Название товара",
      colors: ["red", "blue", "orange"],
      sizes: [],
    },
    {
      id: 4,
      imgUrl: "",
      price: 12.0,
      amout: 5,
      title: "Название товара",
      colors: [],
      sizes: ["XS", "S", "L", "XL"],
    },
    {
      id: 5,
      imgUrl: "",
      price: 8.0,
      amout: 11,
      title: "Название товара",
      colors: ["red", "blue", "orange"],
      sizes: ["XS", "S", "L", "XL"],
    },
    {
      id: 6,
      imgUrl: "",
      price: 5.0,
      amout: 9,
      title: "Название товара",
      colors: ["red", "blue", "orange"],
      sizes: [],
    },
    {
      id: 7,
      imgUrl: "",
      price: 5.0,
      amout: 1,
      title: "Название товара",
      colors: ["red", "blue", "orange"],
      sizes: ["XS", "S", "L", "XL"],
    },
    {
      id: 8,
      imgUrl: "",
      price: 4.0,
      amout: 17,
      title: "Название товара",
      colors: [],
      sizes: [],
    },
  ],
  loading: false,
  status: "",
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      state.status = "LOADING";
      state.list = [];
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = "SUCCESS";
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      state.status = "ERROR";
      state.list = [];
    });
  },
});
export const selectShop = (state: RootState) => state.shop;

export const {} = shopSlice.actions;

export default shopSlice.reducer;
