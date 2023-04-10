import { axiosAuth } from "../apiService";

export const login = async (username: string, password: string) => {
  return axiosAuth
    .post("/token", {
      username,
      password,
      client_id: process.env.CLIENT_ID,
      grant_type: process.env.GRAND_TYPE,
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const updateAccessToken = async (refresh_token:string) => {
  return axiosAuth.post(`/token`, {
    client_id: process.env.CLIENT_ID,
    grant_type: process.env.GRAND_TYPE_REFRESH,
    refresh_token,
  });
};
export const logout = async (refresh_token:string) => {
  return axiosAuth.post(`/logout`, {
    client_id: process.env.CLIENT_ID,
    refresh_token,
  });
};
