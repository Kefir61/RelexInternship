import { AxiosResponse } from 'axios';
import { axiosOur, IUserInfo, IUpdateAxiosDeilivery, IUpdateInfoParams } from '@utils';

export const getUserInfo = (): Promise<AxiosResponse<IUserInfo>> => {
    return axiosOur.get(`/core/users`);
};

export const updateUserInfo = (params: IUpdateInfoParams): Promise<AxiosResponse<IUserInfo>> => {
    return axiosOur.put(`/core/users`, params);
};

export const updateUserDelivery = (params: IUpdateAxiosDeilivery): Promise<AxiosResponse> => {
    return axiosOur.post(`/core/users/delivery`, params);
}

export const getUserImage = (id: string): Promise<AxiosResponse<string>> => {
    return axiosOur.get(`/core/images/${id}`);
};
