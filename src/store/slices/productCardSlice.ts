import { axiosOur } from "@utils";
import { ShopProductItem, TStatus } from "./shopSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type FetchProductArgs = {
  id: number;
};

export const fetchProductCard = createAsyncThunk<
  ShopProductItem,
  FetchProductArgs
>("productCard/fetchProductCardStatus", async (params) => {
  const { id } = params;
  const { data } = await axiosOur.get<ShopProductItem>(`/shop/products/${id}`);
  return data;
});

interface ProductSliceState {
  product: ShopProductItem;
  status: TStatus;
}

const defaultProduct: ShopProductItem = {
  id: null,
  description: "",
  mainImageId: null,
  productImageIds: null,
  productVarieties: null,
  price: null,
  name: "",
  amount: null,
  colors: [],
  sizes: [],
  featured:false,
};

const initialState: ProductSliceState = {
  product: defaultProduct,
  status: "LOADING",
};

const productCardSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductCard.pending, (state) => {
      state.status = "LOADING";
      state.product = defaultProduct;
    });
    builder.addCase(fetchProductCard.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = "SUCCESS";
    });
    builder.addCase(fetchProductCard.rejected, (state) => {
      state.status = "ERROR";
      state.product = defaultProduct;
    });
  },
});
export const selectProductCard = (state: RootState) => state.product;

export const {} = productCardSlice.actions;

export default productCardSlice.reducer;
