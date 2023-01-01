import { Axios } from "../environment/axios";
import { AuthForm } from "../type/user";

const AuthApi = {
  createUser: async (userInfo: AuthForm) => {
    const data = await Axios.post("/users/create", {
      ...userInfo,
    });
    return data;
  },
  login: async (loginInfo: AuthForm) => {
    const data = await Axios.post("/users/login", { ...loginInfo });
    return data;
  },
};

export default AuthApi;
