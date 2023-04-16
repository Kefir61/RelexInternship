import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosOur } from "@utils";
import { ShopProductItem } from "./shopSlice";
import { AppDispatch } from "../store";

interface IFavoritesState {
  contents:ShopProductItem[],
  totalPages:number,
  loading:boolean,
  error:string,
}

interface getListParams {
  currentPage: number,  
  pageSize: number,
  price: "ASC" | "DESC",
}

interface getJsonType {
  contents:ShopProductItem[],
  currentPage:number,
  pageSize:number,
  totalPages:number,
}

export const getFavorites = createAsyncThunk<getJsonType, getListParams, {rejectValue: string}>(
  'favorites/getFavorites',
  async (requestParams, { rejectWithValue }) => {
    const params = new URLSearchParams({
      currentPage:`${requestParams.currentPage}`,
      pageSize: `${requestParams.pageSize}`,
      price: `${requestParams.price}`,
    });
    const data = await axiosOur.get<getJsonType>(`/shop/features/user`, {params})
    .then((response)=>response.data)
    .catch((error)=>rejectWithValue(error))
    return data;
  }
)

interface idParam {
  id: number,
}

export const addFavorite = createAsyncThunk<number, idParam, {rejectValue: string}>(
  'favorites/addFavorite',
  async (requestParams, { rejectWithValue }) => {
    const response = await axiosOur.post(`/shop/features/${requestParams.id}/user`)
      .then((response)=>response.status)
      .catch((error)=>rejectWithValue(error))
    return response;
  }
)

export const deleteOneFavorite = createAsyncThunk<number, idParam, {rejectValue: string}>(
  'favorites/deleteOneFavorite',
  async (requestParams, { rejectWithValue }) => {
    const response = await axiosOur.delete(`/shop/features/${requestParams.id}/user`)
      .then((response)=>response.status)
      .catch((error)=>rejectWithValue(error))
    return response;
  }
)

export const deleteAll = createAsyncThunk<number, undefined, {rejectValue: string, dispatch: AppDispatch}>(
  'favorites/deleteAllFavorite',
  async (_, { rejectWithValue, dispatch }) => {
    const response = await axiosOur.delete(`/shop/features/user`)
      .then((response)=>{
        dispatch(deleteAllFav())
        return response.status
      })
      .catch((error)=>rejectWithValue(error))
    return response;
  }
)

const initialState: IFavoritesState = {
  contents:[],   
  totalPages: 0,
  loading:false,
  error:''
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    deleteAllFav(state) {
      state.contents = [];
      state.totalPages = 0;
      state.loading = false;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFavorites.pending, (state)=>{
      state.loading = true
      state.contents = [];
      state.error = ''
    })
    .addCase(getFavorites.fulfilled, (state, action)=>{      
      state.contents = action.payload.contents;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    })
    .addCase(getFavorites.rejected, (state, action)=>{
      state.loading = false
      state.error = action.error.message      
    })
  }
});

export const {deleteAllFav} = favoritesSlice.actions;

export default favoritesSlice.reducer;
