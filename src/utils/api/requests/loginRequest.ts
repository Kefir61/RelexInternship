import { axiosAuth } from "../apiService";

export const login = async (username: string, password: string) => {
    const client_id = "frontend";
    const grant_type = "password";
    return axiosAuth
      .post("", { username, password, client_id, grant_type })
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  };