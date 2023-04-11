import { AxiosResponse } from "axios";
import { axiosOur } from "../apiService";

export const itemToCart = (id: number): Promise<AxiosResponse> => {
  return axiosOur.post(`/shop/cart/user`, {
    productVarietyId: id,
    quantity: 1,
  });
};
