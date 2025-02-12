import axios from "./axios";

/* Funcion para pedir al servidor las opciones */
export const getOptionsRequest = async (id_pregunta) => axios.get(`/option/gets/${id_pregunta}}`);

/* Funcion para pedir al servidor una opcion */
export const addOptionRequest = async (data) => axios.post(`/option/add/${data.id_pregunta}`, data);

/* Funcion para agregar mediante el servidor una opcion */
export const editOptionRequest = async (data) => axios.put(`/option/edit/${data.id}`, data);

/* Funcion para eliminar mediante el servidor una opcion */
export const deleteOptionRequest = async (id) => axios.delete(`/option/delete/${id}`);