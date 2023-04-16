import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/autoCompleteUsersSlice";
import balanceReducer from "./slices/balanceSlice";
import cartReducer from "./slices/cartSlice";
import myOrdersReducer from "./slices/myOrdersSlice";
import myThanksReducer from "./slices/myThanksSlice";
import newsReducer from "./slices/newsFeedSlice";
import sendThanksReducer from "./slices/sendThanksSlice";
import shopFilterReducer from "./slices/shopFilterSlice";
import shopReducer from "./slices/shopSlice";
import userInfoReducer from "./slices/userSlice";
import productReducer from "./slices/productCardSlice";
import productFilterReducer from "./slices/productFilterSlice";
import favoritesReducer from "./slices/favoritesSlice";


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
    myOrders: myOrdersReducer,
    feed: newsReducer,
    product: productReducer,
    productFilter: productFilterReducer,
    favorites: favoritesReducer,
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
