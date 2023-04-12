import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { EReactionType, IOneMyThanks, axiosOur } from "@utils";
import { AppDispatch } from "../store";

interface IMyThanksState {
  list:IOneMyThanks[],
  totalPages:number,
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

export const fetchReactToThank = createAsyncThunk<string, reactParams, {rejectValue: string, dispatch: AppDispatch}>(
  'thanks/fetchReactToThank',
  async (requestParams, { rejectWithValue, dispatch }) => {
    const body = {userReaction: requestParams.reaction}
    await axiosOur.post(`/core/thanks/${requestParams.id}/vote/user`, body)
    .then((response)=>{ 
      dispatch(reactToThank({id: requestParams.id, reaction: requestParams.reaction}))           
      })
    .catch((error)=>rejectWithValue(error))
    return 'ok';
}
)

const initialState: IMyThanksState = {
  list:[],   
  totalPages: 0,
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
      let index = state.list.findIndex(e => e.id === action.payload.id);
      const oldReaction = state.list[index].userReaction
      state.list[index].userReaction = action.payload.reaction;
      if(action.payload.reaction === EReactionType.DISLIKE) {
        state.list[index].votesDown++
        if(oldReaction === EReactionType.LIKE) {
          state.list[index].votesUp--
        }
      } else if(action.payload.reaction === EReactionType.LIKE) {
        state.list[index].votesUp++
        if(oldReaction === EReactionType.DISLIKE) {
          state.list[index].votesDown--
        }
      } if(action.payload.reaction === EReactionType.NONE) {
        if(oldReaction === EReactionType.DISLIKE) {
          state.list[index].votesDown--
        } else if(oldReaction === EReactionType.LIKE) {
          state.list[index].votesUp--
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
