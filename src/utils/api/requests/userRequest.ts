import { AxiosResponse } from 'axios';
import { axiosOur, IUserInfo, IUpdateAxiosDeilivery, IUpdateInfoParams, INotification } from '@utils';

export const getUserInfo = (): Promise<AxiosResponse<IUserInfo>> => {
    return axiosOur.get(`/users`);
};

export const updateUserInfo = (params: IUpdateInfoParams): Promise<AxiosResponse<IUserInfo>> => {
    return axiosOur.put(`/users`, params);
};

export const updateUserDelivery = (params: IUpdateAxiosDeilivery): Promise<AxiosResponse> => {
    return axiosOur.post(`/users/delivery`, params);
}

export const updateUserNotifications = (params: INotification) => {
    return axiosOur.put(`/users/notifications`, params);
}

export const getUserImage = (id: string): Promise<AxiosResponse<string>> => {
    return axiosOur.get(`/images/${id}`);
};
