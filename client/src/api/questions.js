import axios from "./axios";

/* Funcion para pedir al servidor las preguntas */
export const getQuestionsRequest = async (id_examen) => axios.get(`/question/gets/${id_examen}}`);

/* Funcion para pedir al servidor una pregunta */
export const getQuestionRequest = async (id) => axios.get(`/question/get/${id}}`);

/* Funcion para agregar mediante el servidor una pregunta */
export const addQuestionRequest = async (data) => axios.post(`/question/add`, data);

/* Funcion para editar mediante el servidor una pregunta */
export const editQuestionRequest = async (data) =>
  axios.put(`/question/edit/${data.id}`, data);

/* Funcion para eliminar mediante el servidor una pregunta */
export const deleteQuestionRequest = async (id) => axios.delete(`/question/delete/${id}`);

/* Funcion para eliminar mediante el servidor las preguntas */
export const deleteQuestionsRequest = async (id_examen) => axios.delete(`/question/deletes/${id_examen}`);