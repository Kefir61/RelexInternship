import { AxiosResponse } from 'axios';
import { API_URLS, axiosOur, } from '@utils';

export const postThanks = (data: string): Promise<AxiosResponse> => {
    return axiosOur.post(`/core/${API_URLS.THANKS}`, data)
};
