import { AxiosResponse } from 'axios';
import { axiosOur, } from '@utils';
import { ShopProductItem } from 'src/store/slices/shopSlice';

export const getCart = (): Promise<AxiosResponse<ShopProductItem[]>> => {
    return axiosOur.get(`/cart/user`);
    //return axiosOur.get(`/cart/user`, {data: 'v_ivanov'});
    //return axiosOur.get(`/cart/user/v_ivanov`);
    //return axiosOur.get(`/cart/user`, {params: 'v_ivanov'});
};

export const deleteFromCart = (id: number): Promise<AxiosResponse<ShopProductItem[]>> => {
    return axiosOur.delete(`/cart`, {data: id})
};

