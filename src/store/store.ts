import { configureStore } from "@reduxjs/toolkit";
import myThanksReducer from "./slices/myThanksSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    MyThanks: myThanksReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
