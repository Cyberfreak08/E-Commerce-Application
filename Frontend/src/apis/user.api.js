import instance from "../utils/api";

export const signInApi = async (user) => {
  const response = await instance.post('/login',user);  
    return response?.data;
};
export const signUpApi= async (user) => {
  const response = await instance.post('/register',user);
  return response?.data;
}

export const getCurrentUserApi = async () => {
  const response = await instance.get(`/user`);
  return response?.data;
};
