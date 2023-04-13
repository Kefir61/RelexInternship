import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { changeQuantity, getCart, sendOrder } from '../../utils/api/requests/cartRequest';

export const fetchCart = createAsyncThunk<fetchCartProps, {}, {rejectValue: string}>(
    'cart/fetchCart',
    async function(_, {rejectWithValue}) {
        try {
            const response = await getCart();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeCartItemQuantity = createAsyncThunk<fetchCartProps, {}, {rejectValue: string}>(
    'cart/ChangeCartItemQuantity',
    async function(data, {rejectWithValue}) {
        try {
            const response = await changeQuantity(data);            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendCartOrder = createAsyncThunk<number, string, {rejectValue: string}>(
    'cart/sendCartOrder',
    async function(comment: string, {rejectWithValue}) {
        try {
            const response = await sendOrder(comment);
            return response.status;
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);

export interface cartProductProps{
    color: string, 
    id: number, 
    mainImageId: number,
    nameProduct: string,
    price: number,
    quantity: number,
    size: string | null
}

export interface cartItemProps{
    productVariety: cartProductProps,
    quantity: number
} 

export interface fetchCartProps{
    cartItems: cartItemProps[];
    deliveryMethod: string,
}

interface CartSliseState {
    cartList: cartItemProps[];
    deliveryMethod: string;
    loading: boolean;
    responseStatus: number;
    error: boolean;
    errorCode: string;
    totalPrice: number;
    comment: string;
}

const initialState: CartSliseState = {
    cartList: [],
    loading: false,
    responseStatus: 0,
    error: false,
    totalPrice: 0,
    deliveryMethod: '',
    comment: '',
    errorCode: ''
};  

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        countTotalPrice(state, action) {
            state.totalPrice = state.cartList.reduce(function(sum, current) {
                if(current.productVariety.id === action.payload.id){
                  current.quantity = action.payload.quantity
                }
                return sum + current.quantity*current.productVariety.price
            }, 0);
        },
        setComment(state, action){
            state.comment = action.payload.comment;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase (fetchCart.pending, (state) => {
            state.loading = true;
        })
        .addCase (fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartList = action.payload.cartItems;
            state.deliveryMethod = action.payload.deliveryMethod;
        })
        .addCase (fetchCart.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })

        .addCase (changeCartItemQuantity.fulfilled, (state, action) => {
            state.cartList = action.payload.cartItems;
        })
        .addCase (changeCartItemQuantity.rejected, (state) => {
            state.error = true;
        })

        .addCase (sendCartOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase (sendCartOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.responseStatus = action.payload;
        })
        .addCase (sendCartOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.errorCode = action.payload
        })
    }
})

export const selectCart = (state: RootState) => state.cart;
export const {countTotalPrice, setComment} = cartSlice.actions;
export const {} = cartSlice.actions;

export default cartSlice.reducer;