import { AxiosResponse } from 'axios';
import { axiosOur, } from '@utils';
import { fetchCartProps } from 'src/store/slices/cartSlice';

export const getCart = (): Promise<AxiosResponse<fetchCartProps>> => {
    return axiosOur.get(`/shop/cart/user`);
};

export const changeQuantity = (data: any): Promise<AxiosResponse> => {
    return axiosOur.post(`/shop/cart/user`, data)
};

