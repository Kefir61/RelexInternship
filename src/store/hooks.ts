import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

  export const appDispatch = useDispatch<AppDispatch>;
  export const appSelector: TypedUseSelectorHook<RootState> = useSelector;
