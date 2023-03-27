import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IOneMyThanks } from "src/utils/types/IOneMyThanks";

interface IMyThanksState {
  list:IOneMyThanks[],
  totalElements:number,
  loading:boolean,
  error:string | null,
}

interface getListParams {
  id:number,
  currentPage: number,
  pageSize: number,
}

export const fetchMyThanks = createAsyncThunk<IOneMyThanks[], getListParams, {rejectValue: string}>(
  'thanks/fetchThanks',
  async function (params, { rejectWithValue }) {
    const response = await fetch(`https://core-service/api/thanks/history/user/{${params.id}}?currentPage=${params.currentPage}&pageSize=${params.pageSize}`)
    if(!response.ok) {
      return rejectWithValue('server error')
    }

    const data = await response.json()
    return data
  }
)

const initialState: IMyThanksState = {
  list:[],   
  totalElements: 0,
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
