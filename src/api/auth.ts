import { Axios } from "../environment/axios";
import { UseApiResponse } from "../type/common";
import { AuthForm } from "../type/user";

const AuthApi = {
  createUser: async (userInfo: AuthForm): Promise<UseApiResponse> => {
    const { data } = await Axios.post("/users/create", {
      ...userInfo,
    });
    return data;
  },
  login: async (loginInfo: AuthForm): Promise<UseApiResponse> => {
    const { data } = await Axios.post("/users/login", { ...loginInfo });
    return data;
  },
};

export default AuthApi;
