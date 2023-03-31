import { configureStore } from "@reduxjs/toolkit";
import myThanksReducer from "./slices/myThanksSlice";
import shopReducer from "./slices/shopSlice";
import sendThanksReducer from "./slices/sendThanksSlice";

export const store = configureStore({
  reducer: {
    MyThanks: myThanksReducer,
    shop: shopReducer,
    sendThanks: sendThanksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
