import axios from "./axios";

export const getAnswersRequest = async () => axios.get(`/answer/gets/${id_pregunta}/${id_usuario}`);

export const addAnswerRequest = async (data) => axios.post(`/answer/add`, data);

export const editAnswerRequest = async (data) => axios.put(`/answer/edit/${data.id}`, data);

export const deleteAnswerRequest = async (id) => axios.delete(`/answer/delete/${id}`);