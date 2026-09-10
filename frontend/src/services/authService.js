import api from "./api";


const login = async (loginData) => {

  const response = await api.post(
    "/auth/login",
    loginData
  );

  console.log(
    "CARELINK BACKEND LOGIN RESPONSE:",
    response.data
  );

  return response.data;
};


const register = async (registerData) => {

  const response = await api.post(
    "/auth/register",
    registerData
  );

  return response.data;
};


export default {
  login,
  register,
};