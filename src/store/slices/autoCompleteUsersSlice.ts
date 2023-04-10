import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, axiosOur, imageUrl } from "@utils";

interface IUsersState {
  usersList:IUser[],
  loading:boolean,
  error:string,
}

export const fetchUsers = createAsyncThunk<IUser[], undefined, {rejectValue: string}>(
  'users/getUsers',
  function (_, { rejectWithValue }) {
    const response = axiosOur.get<IUser[]>(`/users/all`)
    .then((response)=>response.data)
    .catch((error)=>rejectWithValue(error))
    return response;
  }
)

const initialState: IUsersState = {
  usersList:[],
  loading:false,
  error:''
};

const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending, (state)=>{
      state.loading = true
      state.error = ''
    })
    .addCase(fetchUsers.fulfilled, (state, action)=>{
      state.usersList = action.payload;
      state.usersList.forEach((user, index) => {
        if(!!action.payload[index].mainImageId) {
          state.usersList[index].mainImageId = `${imageUrl}${action.payload[index].mainImageId}`;
        }
      });
      state.loading = false
    })
  }
});

export const {} = getUsersSlice.actions;
export default getUsersSlice.reducer;
