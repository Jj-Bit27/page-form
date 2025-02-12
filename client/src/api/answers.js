import axios from "./axios";

/* Funcion para pedir al servidor las respuestas */
export const getAnswersRequest = async () => axios.get(`/answer/gets/${id_pregunta}/${id_usuario}`);

/* Funcion para agregar mediante el servidor una respuesta */
export const addAnswerRequest = async (data) => axios.post(`/answer/add`, data);

/* Funcion para editar mediante el servidor una respuesta */
export const editAnswerRequest = async (data) => axios.put(`/answer/edit/${data.id}`, data);

/* Funcion para eliminar mediante el servidor una respuesta */
export const deleteAnswerRequest = async (id) => axios.delete(`/answer/delete/${id}`);