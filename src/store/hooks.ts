import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

export const appSelector: TypedUseSelectorHook<RootState> = useSelector;
