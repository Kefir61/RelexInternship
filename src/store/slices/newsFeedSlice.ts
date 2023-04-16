import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENewsTypes, EReactionType, INews, axiosOur } from "@utils";
import { AppDispatch } from "../store";

interface INewsFeedState {
  content:INews[],
  totalPages:number,
  loading:boolean,
  error:string,
}

interface getListParams {
  currentPage: number,  
  pageSize: number,
  userId?:string | null,
  category?:ENewsTypes | null,
}

interface getJsonType {
  content:INews[],
  currentPage:number,
  pageSize:number,
  totalPages:number,
}

export const fetchNews = createAsyncThunk<getJsonType, getListParams, {rejectValue: string}>(
  'feeds/fetchNews',
  async (requestParams, { rejectWithValue }) => {
    const params = {
        currentPage:`${requestParams.currentPage}`,
        pageSize: `${requestParams.pageSize}`,
        category: requestParams?.category,
        userId: requestParams?.userId,
    }
    const data = await axiosOur.get<getJsonType>(`/core/feeds`, {params})
    .then((response)=>response.data)
    .catch((error)=>rejectWithValue(error))
    return data;
  }
)

interface reactParams {
  id:number,
  reaction:EReactionType,
}

export const fetchReactToNews = createAsyncThunk<number, reactParams, {rejectValue: string, dispatch: AppDispatch}>(
  'thanks/fetchReactToThank',
  async (requestParams, { rejectWithValue, dispatch }) => {
    const body = {userReaction: requestParams.reaction}
    const response = await axiosOur.post(`/core/feeds/${requestParams.id}/vote/user`, body)
    .then((response)=>{ 
      dispatch(reactToNews({id: requestParams.id, reaction: requestParams.reaction})) 
      return response.status     
      })
    .catch((error)=>rejectWithValue(error))
    return response;
}
)

const initialState: INewsFeedState = {
  content:[],   
  totalPages: 0,
  loading:false,
  error:''
};

interface IReactNewsPayload {
  id:number, 
  reaction: EReactionType,
}

const newsFeedSlice = createSlice({
  name: "newsFeed",
  initialState,
  reducers: {
    reactToNews(state, action: PayloadAction<IReactNewsPayload>) {
      let indexOfItemToReact = state.content.findIndex(news => news.id === action.payload.id);
      const prevReaction = state.content[indexOfItemToReact].userReaction
      state.content[indexOfItemToReact].userReaction = action.payload.reaction;
      if(action.payload.reaction === EReactionType.DISLIKE) {
        state.content[indexOfItemToReact].votesDown++
        if(prevReaction === EReactionType.LIKE) {
          state.content[indexOfItemToReact].votesUp--
        }
      } else if(action.payload.reaction === EReactionType.LIKE) {
        state.content[indexOfItemToReact].votesUp++
        if(prevReaction === EReactionType.DISLIKE) {
          state.content[indexOfItemToReact].votesDown--
        }
      } if(action.payload.reaction === EReactionType.NONE) {
        if(prevReaction === EReactionType.DISLIKE) {
          state.content[indexOfItemToReact].votesDown--
        } else if(prevReaction === EReactionType.LIKE) {
          state.content[indexOfItemToReact].votesUp--
        } 
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchNews.pending, (state)=>{
      state.loading = true
      state.error = ''
    })
    .addCase(fetchNews.fulfilled, (state, action)=>{
      state.content = action.payload.content;
      state.totalPages = action.payload.totalPages;
      state.loading = false
    })
    .addCase(fetchNews.rejected, (state, action)=>{
      state.loading = false
      state.error = action.error.message      
    })
  }
});

export const {reactToNews} = newsFeedSlice.actions;

export default newsFeedSlice.reducer;
