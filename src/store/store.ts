import { configureStore } from "@reduxjs/toolkit";
import myThanksReducer from "./slices/myThanksSlice";
import usersReducer from "./slices/autoCompleteUsersSlice";
import shopReducer from "./slices/shopSlice";
import sendThanksReducer from "./slices/sendThanksSlice";
import userInfoReducer from "./slices/userSlice";
import shopFilterReducer from "./slices/shopFilterSlice";
import balanceReducer from "./slices/balanceSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productCardSlice";
import productFilterReducer from "./slices/productFilterSlice";


export const store = configureStore({
  reducer: {
    shopFilter: shopFilterReducer,
    MyThanks: myThanksReducer,
    UserInfo: userInfoReducer,
    shop: shopReducer,
    users: usersReducer,
    sendThanks: sendThanksReducer,
    balance: balanceReducer,
    cart: cartReducer,
    product: productReducer,
    productFilter: productFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/updateStateNotifications'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
