import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserInfo, getUserInfo, updateUserDelivery, mockNotificationInnersDefault, IUserState, IDelivery, INotification, INotificationUpdate, INotificationParam, updateUserNotifications, IUpdateInfoParams, updateUserInfo, imageUrl } from '@utils';
import type { RootState, AppDispatch } from '../store';

const defaultUser: IUserInfo = {
    id: '',
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
    userDeliveries: [{
        name: '',
        displayName: '',
        address: ''
    }],
    userNotifications: mockNotificationInnersDefault
}

const initialState: IUserState =  {
    user: defaultUser,
    userLastState: defaultUser,
    userImage: '',
    error: null,
    loading: true,
}

export const getUser = createAsyncThunk<IUserInfo, undefined, {rejectValue: string, dispatch: AppDispatch}>(
    'user/fetchUser',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await getUserInfo();
            if (!!response.data.mainImageId) {
                dispatch(updateUserImage(`${imageUrl}${response.data.mainImageId}`));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateDelivery = createAsyncThunk<
    void,
    undefined,
    {
        dispatch: AppDispatch;
        state: RootState;
        rejectValue: string;
    }
>(
    'user/updateDelivery',
    async function(_, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await updateUserDelivery({
                name: getState().UserInfo.user.userDeliveries[0].name,
                address: getState().UserInfo.user.userDeliveries[0].address,
                fromOffice: getState().UserInfo.user.fromOffice
            });
            dispatch(editUserLastState())
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateNotifications = createAsyncThunk<
    void,
    undefined,
    {
        dispatch: AppDispatch;
        state: RootState;
        rejectValue: string;
    }
>(
    'user/updateNotifications',
    async function(_, {rejectWithValue, dispatch, getState}) {
        try {
            const newNotification: INotification = {
                userNotifications: getState().UserInfo.user.userNotifications
            };
            const response = await updateUserNotifications(newNotification);
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
            const response = await updateUserInfo(updateParams);
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
        editUserLastState (state) {
            state.userLastState = state.user;
        },
        editUser(state, action: PayloadAction<IUpdateInfoParams>) {
            state.user = {...state.user, ...action.payload};
            state.userLastState = state.user;
        },
        resetUser(state) {
            state.user = state.userLastState;
        },
        updateStateNotifications(state, action: PayloadAction<INotificationUpdate>) {
            state.user.userNotifications[action.payload.label as keyof typeof state.user.userNotifications][action.payload.index] = {
                target: action.payload.target, 
                status: !action.payload.status
            };
        },
        updateOrderDelivery(state, action: PayloadAction<string>) {
            const currentDelivery = state.user.userDeliveries.find((delivery: IDelivery) => delivery.name === action.payload);
            state.user.userDeliveries = state.user.userDeliveries.filter((delivery: IDelivery) => delivery.name !== currentDelivery.name);
            state.user.userDeliveries.unshift(currentDelivery);
        },
        updateDeliveryAddress(state, action: PayloadAction<string>) {
            state.user.userDeliveries[0].address = action.payload;
        },
        updateStatus(state, action: PayloadAction<string>) {
            state.user.statusMessage =  action.payload;
        },
        updateShowBirthday(state, action: PayloadAction<boolean>) {
            state.user.showBirthday =  action.payload;
        },
        updateFromOffice(state) {
            state.user.fromOffice = !state.user.fromOffice;
        },
        updateUserImage(state, action: PayloadAction<string>) {
            state.userImage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.userLastState = action.payload;
        }),
        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.payload;
        }),
        builder.addCase(updateDelivery.rejected, (state, action) => {
            state.error = action.payload;
        }),
        builder.addCase(updateDelivery.fulfilled, (state, action) => {
            state.userLastState = state.user;
        })
    },
});

export const {editUser, updateStatus, updateUserImage, 
    updateOrderDelivery, editUserLastState, updateDeliveryAddress, 
    updateFromOffice, updateShowBirthday, resetUser, updateStateNotifications} = userSlice.actions;
    
export default userSlice.reducer;
