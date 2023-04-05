import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EOperaionType, IOneMyThanks, myThanksMocks } from "@utils";
import axios from "axios";

interface IMyThanksState {
  list:IOneMyThanks[],
  totalPages:number,
  loading:boolean,
  error:string | null,
}

interface getListParams {
  id:number,
  currentPage: number,
  pageSize: number,
}

interface getJsonType {
  history:IOneMyThanks[],
  currentPage:number,
  pageSize:number,
  totalPages:number,
}

export const fetchMyThanks = createAsyncThunk<IOneMyThanks[], getListParams, {rejectValue: string}>(
  'thanks/fetchThanks',
  function (requestParams, { rejectWithValue }) {
    const params = new URLSearchParams({
      currentPage:`${requestParams.currentPage}`,
      pageSize: '3',
    });  
  const BASE_URL = 'http://relex-coin.relex.ru:9100/api/core';
  const response = axios.get<getJsonType>(`${BASE_URL + '/thanks/history/user/2'}`,
  {
    params:params.toString(),
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
           Accept: '*/*',
      }
  })
  .then((response)=>{
    return response.data.history})
  .catch((error)=>rejectWithValue(error))
  return response;
}
)

const initialState: IMyThanksState = {
  list:myThanksMocks,   
  totalPages: 2,
  loading:false,
  error:null
};

const myThanksSlice = createSlice({
  name: "MyThanks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchMyThanks.pending, (state)=>{
      state.loading = true
      state.error = null
    })
    .addCase(fetchMyThanks.fulfilled, (state, action)=>{
      state.list = action.payload;
      state.loading = false
    })

  }
});

export const {} = myThanksSlice.actions;

export default myThanksSlice.reducer;
