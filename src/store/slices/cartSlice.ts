import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getCart } from '../../utils/api/requests/cartRequest';
import { ShopProductItem } from './shopSlice';

export const fetchCart = createAsyncThunk<any, any, {rejectValue: string}>(
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

interface CartSliseState {
    cartList: cartItemProps[];
    deliveryMethod: string,
    loading: boolean;
    status: string | null;
    error: boolean;
    totalPrice: number;
    comment: string;
}

const initialState: CartSliseState = {
    cartList: [],
    loading: false,
    status: null,
    error: false,
    totalPrice: 0,
    deliveryMethod: '',
    comment: ''
};  

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        countTotalPrice(state, action) {
            state.totalPrice = 0;
            state.cartList.map((item) => {
                
                if(item.productVariety.id === action.payload.id){
                    item.quantity = action.payload.quantity
                }
                state.totalPrice += item.quantity*item.productVariety.price
            })
        },
        setComment(state, action){
            state.comment = action.payload;
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
        .addCase (fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        })
    }
})

export const selectCart = (state: RootState) => state.cart;
export const {countTotalPrice, setComment} = cartSlice.actions;
export const {} = cartSlice.actions;

export default cartSlice.reducer;