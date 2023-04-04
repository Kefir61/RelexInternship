import { AxiosResponse } from 'axios';
import { axiosOur, IUserInfo, IDelivery, IUpdateInfoParams } from '@utils';

export const getUserInfo = (id: number): Promise<AxiosResponse<IUserInfo>> => {
    return axiosOur.get(`/users/${id}`);
};

export const updateUserInfo = (id: number, params: IUpdateInfoParams): Promise<AxiosResponse<IUserInfo>> => {
    return axiosOur.put(`/users/${id}`, params);
};

export const getUserImage = (id: number): Promise<AxiosResponse<string>> => {
    return axiosOur.get(`/images/${id}`);
};

export const updateUserDelivery = (id: number, params: IDelivery): Promise<AxiosResponse> => {
    return axiosOur.put(`/users/${id}/delivery`, params);
}
