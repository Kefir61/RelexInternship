import { AxiosResponse } from "axios";
import { axiosOur } from "@utils";

export const getBalance = (): Promise<AxiosResponse> => {
  return axiosOur.get(`/core/users/balance`);
};
