import { AxiosResponse } from "axios";
import { axiosOur } from "../apiService";

export const itemToCart = (
  id: number,
  quantity = 1
): Promise<AxiosResponse> => {
  
  return axiosOur.post(`/shop/cart/user`, {
    productVarietyId: id,
    quantity: quantity,
  });
};
