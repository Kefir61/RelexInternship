import { AxiosResponse } from 'axios';
import { axiosOur, } from '@utils';
import { ShopProductItem } from 'src/store/slices/shopSlice';

export const getCart = (): Promise<AxiosResponse<ShopProductItem[]>> => {
    return axiosOur.get(`/shop/cart/user`);
};

export const deleteFromCart = (id: number): Promise<AxiosResponse<ShopProductItem[]>> => {
    return axiosOur.delete(`/cart`, {data: id})
};

