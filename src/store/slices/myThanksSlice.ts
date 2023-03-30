import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EOperaionType, IOneMyThanks } from "@utils";
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
    console.log(response.data.history);
    // const one = {list: response.data.history, totalPages:response.data.totalPages, loading:false, error:'NO'}
    return response.data.history})
  .catch((error)=>rejectWithValue(error))
  return response;
}
)

const initialState: IMyThanksState = {
  list:[{
    comment:'asd', 
    commentsCount:2, 
    createdAt:'2022-21-21T21:21', 
    id:3, operationType: EOperaionType.FROM, 
    thanksAmount:3, 
    votesDown:3, 
    votesUp:0, 
    comments:[{id:1,comment:'Привет', createdAt:'2022-21-21T21:21', user:{
      firstName:'Алексей', 
      id:3, 
      lastName:'Петров', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }}, 
    {id:2,comment:'long message', createdAt:'2022-21-21T21:21', user:{
      firstName:'Олег', 
      id:2, 
      lastName:'Васильев', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }}, 
    {id:3,comment:'long message and another and another and another', createdAt:'2022-21-21T21:21', user:{
      firstName:'Олег', 
      id:1, 
      lastName:'Сидоров', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }},
  ],
    user:{
      firstName:'Олег', 
      id:2, 
      lastName:'Сидоров', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }}, {
      comment:'asd', 
      commentsCount:2, 
      createdAt:'2022-21-21T21:21', 
      id:3, operationType: EOperaionType.FROM, 
      thanksAmount:3, 
      votesDown:3, 
      votesUp:0, 
      comments:[{id:1,comment:'Привет', createdAt:'2022-21-21T21:21', user:{
        firstName:'Алексей', 
        id:3, 
        lastName:'Петров', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }}, 
      {id:2,comment:'long message', createdAt:'2022-21-21T21:21', user:{
        firstName:'Олег', 
        id:2, 
        lastName:'Васильев', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }}, 
      {id:3,comment:'long message and another and another and another', createdAt:'2022-21-21T21:21', user:{
        firstName:'Олег', 
        id:1, 
        lastName:'Сидоров', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }},
    ],
      user:{
        firstName:'Олег', 
        id:1, 
        lastName:'Сидоров', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }}],   
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
