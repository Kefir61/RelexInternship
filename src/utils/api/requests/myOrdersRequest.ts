import { AxiosResponse } from "axios";
import { axiosOur } from "@utils";

export const getMyOrders = (): Promise<AxiosResponse> => {
  return axiosOur.get(`/shop/order/history`);
};