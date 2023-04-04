import { configureStore } from "@reduxjs/toolkit";
import myThanksReducer from "./slices/myThanksSlice";
import shopReducer from "./slices/shopSlice";
import userInfoReducer from "./slices/userSlice";
import shopFilterReducer from "./slices/shopFilterSlice";

export const store = configureStore({
  reducer: {
    shopFilter: shopFilterReducer,
    MyThanks: myThanksReducer,
    UserInfo: userInfoReducer,
    shop: shopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
