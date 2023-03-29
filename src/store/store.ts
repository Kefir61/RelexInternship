import { configureStore } from "@reduxjs/toolkit";
import myThanksReducer from "./slices/myThanksSlice";
import shopReducer from "./slices/shopSlice";

export const store = configureStore({
  reducer: {
    MyThanks: myThanksReducer,
    shop: shopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
