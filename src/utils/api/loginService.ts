export const login = async (email: string, password: string) => {
  return Promise.resolve({
    accessToken: "access_token",
    refreshToken: "refresh_token",
  });
};
