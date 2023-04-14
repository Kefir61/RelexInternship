import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { postThanks } from '../../utils/api/requests/sendThanksRequest';
import { RootState } from "../store";

export const sendThanks = createAsyncThunk<number, string, {rejectValue: string}>(
    'thanks/sendThanks',
    async (data: string, {rejectWithValue}) => {
        try{
            const response = await postThanks(data);
        return response.status;
        }catch(error){
            return rejectWithValue(error.code);
        }
    }
)

export interface loaderSliceState {
    loading: boolean,
    errorCode: string,
    responseStatus: number,
    error: boolean,
}

const initialState: loaderSliceState = {
    loading: false,
    errorCode: '',
    responseStatus: 0,
    error: false,   
}

const sendThanksSlice = createSlice({
    name: 'thanks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(sendThanks.pending, (state)=>{
          state.loading = true;
          state.error = false;
        })
        .addCase(sendThanks.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = false;
            state.responseStatus = action.payload;
        })
        .addCase(sendThanks.rejected, (state, action)=>{
            state.loading = false;
            state.error = true;
            state.errorCode = action.payload;
        })
    }
})

export const selectSendThanks = (state: RootState) => state.sendThanks;
export const {} = sendThanksSlice.actions;
export default sendThanksSlice.reducer;