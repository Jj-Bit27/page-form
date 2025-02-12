import axios from "axios";

/* La url del servidor */
const API_URL = "http://localhost:5000/api";

/* Crear una instancia de axios */
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;