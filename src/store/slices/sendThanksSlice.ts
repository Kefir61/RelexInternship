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
}

const initialState: loaderSliceState = {
    loading: false,
    errorCode: '',
    responseStatus: 0,   
}

const sendThanksSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(sendThanks.pending, (state)=>{
          state.loading = true
        })
        .addCase(sendThanks.fulfilled, (state, action)=>{
            state.loading = false
            state.responseStatus = action.payload
        })
        .addCase(sendThanks.rejected, (state, action)=>{
            state.loading = false
            state.errorCode = action.payload
        })
    }
})

export const selectSendThanks = (state: RootState) => state.sendThanks;
export const {} = sendThanksSlice.actions;
export default sendThanksSlice.reducer;