import axios from "./axios";

export const getOptionsRequest = async (id_pregunta) => axios.get(`/option/gets/${id_pregunta}}`);

export const addOptionRequest = async (data) => axios.post(`/option/add/${data.id_pregunta}`, data);

export const editOptionRequest = async (data) => axios.put(`/option/edit/${data.id}`, data);

export const deleteOptionRequest = async (id) => axios.delete(`/option/delete/${id}`);