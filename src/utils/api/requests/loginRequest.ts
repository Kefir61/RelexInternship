import { axiosAuth } from "../apiService";

export const login = async (username: string, password: string) => {
  return axiosAuth
    .post("", {
      username,
      password,
      client_id: process.env.CLIENT_ID,
      grant_type: process.env.GRAND_TYPE,
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const updateAccessToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  return axiosAuth.post(``, {
    client_id: process.env.CLIENT_ID,
    grant_type: process.env.GRAND_TYPE,
    refresh_token,
  });
};
