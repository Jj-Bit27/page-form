import axios from "./axios";

/* Funcion para registrar un usuario */
export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

/* Funcion para loguear un usuario */
export const loginRequest = async (user) => axios.post(`/auth/login`, user);

/* Funcion para verificar el token de un usuario */
export const verifyTokenRequest = async () => axios.get(`/auth/verify`);