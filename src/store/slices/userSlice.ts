import { createSlice } from "@reduxjs/toolkit";

interface UserSliceState {
  id: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: UserSliceState = {
  id: "",
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
