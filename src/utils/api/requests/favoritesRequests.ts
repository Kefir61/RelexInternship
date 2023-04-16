import { AxiosResponse } from "axios";
import { axiosOur } from "../apiService";

export const favoritesAdd = (id: number): Promise<AxiosResponse> => {
  return axiosOur.post(`/shop/features/${id}/user`);
};
export const favoritesDelete = (id: number): Promise<AxiosResponse> => {
  return axiosOur.delete(`/shop/features/${id}/user`);
};
