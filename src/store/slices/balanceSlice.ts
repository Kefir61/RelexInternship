import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getBalance } from '../../utils/api/requests/balanceRequests';

export const fetchBalance = createAsyncThunk<number, {}, {rejectValue: string}>(
    'balance/fetchBalance',
    async function(_, {rejectWithValue}) {
        try {
            const response = await getBalance();
            return response.data.balance;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

interface BalanceSliseState {
    balance: number;
    loading: boolean,
    status: string | null;
    error: string | null | undefined;
}

const initialState: BalanceSliseState = {
    balance: 0,
    loading: true,
    status: null,
    error: null
};  

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBalance.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(fetchBalance.fulfilled, (state, action) => {
            state.loading = false;
            state.balance = action.payload
        }),
        builder.addCase(fetchBalance.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
});


export const selectBalance = (state: RootState) => state.balance;
export default balanceSlice.reducer;