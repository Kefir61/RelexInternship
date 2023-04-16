import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EReactionType, IOneMyThanks, axiosOur } from "@utils";
import { AppDispatch } from "../store";
import { reactToNews } from "./newsFeedSlice";

interface IMyThanksState {
  list:IOneMyThanks[],
  totalPages:number,
  currentPage:number,
  loading:boolean,
  error:string,
}

interface getListParams {
  currentPage: number,  
  pageSize: number,
}

interface getJsonType {
  history:IOneMyThanks[],
  currentPage:number,
  pageSize:number,
  totalPages:number,
}

export const fetchMyThanks = createAsyncThunk<getJsonType, getListParams, {rejectValue: string}>(
  'thanks/fetchThanks',
  async (requestParams, { rejectWithValue }) => {
    const params = new URLSearchParams({
      currentPage:`${requestParams.currentPage}`,
      pageSize: `${requestParams.pageSize}`,
    });
    const data = await axiosOur.get<getJsonType>(`/core/thanks/history/user`, {params})
    .then((response)=>response.data)
    .catch((error)=>rejectWithValue(error))
    return data;
  }
)

interface reactParams {
  id:number,
  reaction:EReactionType,
}

export const fetchReactToThank = createAsyncThunk<number, reactParams, {rejectValue: string, dispatch: AppDispatch}>(
  'thanks/fetchReactToThank',
  async (requestParams, { rejectWithValue, dispatch }) => {
    const body = {userReaction: requestParams.reaction}
    const response = await axiosOur.post(`/core/thanks/${requestParams.id}/vote/user`, body)
    .then((response)=>{ 
      dispatch(reactToThank({id: requestParams.id, reaction: requestParams.reaction}))    
      dispatch(reactToNews({id: requestParams.id, reaction: requestParams.reaction}))    
      return response.status       
      })
    .catch((error)=>rejectWithValue(error))
    return response;
}
)

const initialState: IMyThanksState = {
  list:[],   
  totalPages: 0,
  currentPage:0,
  loading:false,
  error:''
};

interface IReactToThankPayload {
  id:number, 
  reaction: EReactionType,
}

const myThanksSlice = createSlice({
  name: "MyThanks",
  initialState,
  reducers: {
    reactToThank(state, action: PayloadAction<IReactToThankPayload>) {
      let indexOfThankToReact = state.list.findIndex(thank => thank.id === action.payload.id);
      const prevReaction = state.list[indexOfThankToReact].userReaction
      state.list[indexOfThankToReact].userReaction = action.payload.reaction;
      if(action.payload.reaction === EReactionType.DISLIKE) {
        state.list[indexOfThankToReact].votesDown++
        if(prevReaction === EReactionType.LIKE) {
          state.list[indexOfThankToReact].votesUp--
        }
      } else if(action.payload.reaction === EReactionType.LIKE) {
        state.list[indexOfThankToReact].votesUp++
        if(prevReaction === EReactionType.DISLIKE) {
          state.list[indexOfThankToReact].votesDown--
        }
      } if(action.payload.reaction === EReactionType.NONE) {
        if(prevReaction === EReactionType.DISLIKE) {
          state.list[indexOfThankToReact].votesDown--
        } else if(prevReaction === EReactionType.LIKE) {
          state.list[indexOfThankToReact].votesUp--
        } 
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMyThanks.pending, (state)=>{
      state.loading = true
      state.list = [];
      state.error = ''
    })
    .addCase(fetchMyThanks.fulfilled, (state, action)=>{      
      state.list = action.payload.history;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    })
    .addCase(fetchMyThanks.rejected, (state, action)=>{
      state.loading = false
      state.error = action.error.message      
    })
  }
});

export const {reactToThank} = myThanksSlice.actions;

export default myThanksSlice.reducer;
