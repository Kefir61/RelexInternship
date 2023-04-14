import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyOrders } from '../../utils/api/requests/myOrdersRequest';
import { RootState } from '../store';

export const fetchMyOrders = createAsyncThunk<any, {}, {rejectValue: string}>(
    'orders/fetchMyOrders',
    async function(_, {rejectWithValue}) {
        try {
            const response = await getMyOrders();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export interface ordersInfo{
    id: number,
    registeredAt: string,
    orderSum: number,
    status: string
}

interface OrdersSliseState {
    ordersList: ordersInfo[],
    loading: boolean,
    status: string | null;
    error: string | null | undefined;
}

const initialState: OrdersSliseState = {
    ordersList: [],
    loading: true,
    status: null,
    error: null
};

const myOrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMyOrders.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.ordersList = action.payload.ordersInfo
        }),
        builder.addCase(fetchMyOrders.rejected, (state) => {
            state.loading = false;
        })
    },
});

export const selectMyOrders = (state: RootState) => state.myOrders;
export const {} = myOrdersSlice.actions;
export default myOrdersSlice.reducer;