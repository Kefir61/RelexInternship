import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { API_URLS, BASE_URL } from '@utils';
import axios from 'axios';
import { RootState } from "../store";

let responseStatus: number;

export const sendThanks = createAsyncThunk<any, any, {rejectValue: string}>(
    'thanks/sendThanks',
    async (data) => {
        axios.post(`${BASE_URL + API_URLS.THANKS}`,
            data,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    Accept: '*/*',
               }
            }
        )
        .then((response) => {
          console.log(response);
          if(response.status === 200){
            //   setSuccess(true)
            //   setResponse(true)
            //   setResponseMessage('Благодарность отправлена успешно');
            //   setTimeout(() => setResponse(false), 5000)   
          }
      })
        .catch((error) => {
          console.log(error);
          
          //if(error.code === 'INSUFFICIENT_BALANCE'){
            //setResponseMessage('Недостаточно баллов на счете');
            //}else{
                //setResponseMessage('Что-то пошло не так. Попробуйте еще раз');
            //}
            //setResponse(true)
            //setSuccess(false)
    });
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
        .addCase(sendThanks.fulfilled, (state)=>{
            state.loading = false
            state.responseStatus = responseStatus
        })
        .addCase(sendThanks.rejected, (state)=>{
            state.loading = false
        })
    }
})

export const selectSendThanks = (state: RootState) => state.sendThanks;
export const {} = sendThanksSlice.actions;
export default sendThanksSlice.reducer;