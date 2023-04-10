import { configureStore } from "@reduxjs/toolkit";
import myThanksReducer from "./slices/myThanksSlice";
import usersReducer from "./slices/autoCompleteUsersSlice";
import shopReducer from "./slices/shopSlice";
import sendThanksReducer from "./slices/sendThanksSlice";
import userInfoReducer from "./slices/userSlice";
import shopFilterReducer from "./slices/shopFilterSlice";
import balanceReducer from "./slices/balanceSlice";
import cartReducer from "./slices/cartSlice";


export const store = configureStore({
  reducer: {
    shopFilter: shopFilterReducer,
    MyThanks: myThanksReducer,
    UserInfo: userInfoReducer,
    shop: shopReducer,
    users: usersReducer,
    sendThanks: sendThanksReducer,
    balance: balanceReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
