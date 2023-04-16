import { axiosOur } from "@utils";
import { ShopProductItem, TStatus } from "./shopSlice";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  filterColor: string;
  filterSize: string;
  amountToCart: number;
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
  featured: null,
};

const initialState: ProductSliceState = {
  product: defaultProduct,
  status: "LOADING",
  filterColor: "",
  filterSize: "",
  amountToCart: 1,
};

const productCardSlice = createSlice({
  name: "product",
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
  extraReducers: (builder) => {
    builder.addCase(fetchProductCard.pending, (state) => {
      state.status = "LOADING";
      state.product = defaultProduct;
    });
    builder.addCase(fetchProductCard.fulfilled, (state, action) => {
      state.product = action.payload;
      state.filterColor = action.payload.productVarieties?.[0].color;
      state.filterSize = action.payload.productVarieties?.[0].size;
      state.status = "SUCCESS";
    });
    builder.addCase(fetchProductCard.rejected, (state) => {
      state.status = "ERROR";
      state.product = defaultProduct;
    });
  },
});
export const selectProductCard = (state: RootState) => state.product;

export const { setProductFilterSize, setProductFilterColor, setAmountToCart } =
  productCardSlice.actions;

export default productCardSlice.reducer;
