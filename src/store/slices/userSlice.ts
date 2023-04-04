import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserInfo, getUserInfo, getUserImage, IDelivery, IUpdateInfoParams, updateUserInfo, imageUrl } from '@utils';
import type { RootState, AppDispatch } from '../store';

interface IUserState {
    user: IUserInfo,
    userLastState: IUserInfo,
    userImage: string,
    error: string | null,
    loading: boolean
}

const defaultUser: IUserInfo = {
    id: 0,
    username: '',
    email: '',
    lastName: '',
    firstName: '',
    patronymic: '',
    birthday: '',
    city: '',
    address: '',
    status: '',
    dismissalDate: '',
    mainImageId: '',
    job: '',
    statusMessage: '',
    fromOffice: true,
    showBirthday: false,
    userDeliveries: {
        name: '',
        displayName: '',
        address: ''
    }
}

const initialState: IUserState =  {
    user: defaultUser,
    userLastState: defaultUser,
    userImage: '',
    error: null,
    loading: true,
}

export const fetchUser = createAsyncThunk<IUserInfo, number, {rejectValue: string, dispatch: AppDispatch}>(
    'user/fetchUser',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await getUserInfo(id);
            if (!!response.data.mainImageId) {
                dispatch(updateUserImage(`${imageUrl}${response.data.mainImageId}`));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk<
    IUserInfo,
    IUpdateInfoParams,
    {
        dispatch: AppDispatch;
        state: RootState;
        rejectValue: string;
    }
>(
    'user/updateUser',
    async function(updateParams, {rejectWithValue, dispatch, getState}) {
        try {
            const userID: number = getState().UserInfo.user.id;
            const response = await updateUserInfo(userID, updateParams);
            dispatch(editUser(updateParams));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        editUser(state, action: PayloadAction<IUpdateInfoParams | IDelivery>) {
            state.user = {...state.user, ...action.payload};
            state.userLastState = state.user;
        },
        updateStatus(state, action: PayloadAction<string>) {
            state.user.statusMessage =  action.payload;
        },
        updateShowBirthday(state, action: PayloadAction<boolean>) {
            state.user.showBirthday =  action.payload;
        },
        updateUserImage(state, action: PayloadAction<string>) {
            state.userImage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.userLastState = action.payload;
        }),
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload;
        })
    },
});

export const {editUser, updateStatus, updateUserImage, updateShowBirthday} = userSlice.actions;
export default userSlice.reducer;
