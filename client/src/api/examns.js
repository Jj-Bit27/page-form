import axios from "./axios";

/* Funcion para pedir al servidor los examenes */
export const getExamnsRequest = async () => axios.get(`/exam/gets`);

/* Funcion para pedir al servidor un examen */
export const getExamnRequest = async (id) =>
  axios.get(`/exam/get/${id}`);

/* Funcion para agregar mediante el servidor un examen */
export const addExamnRequest = async (data) => axios.post(`/exam/add`, data);

/* Funcion para editar mediante el servidor un examen */
export const editExamnRequest = async (data) => axios.put(`/exam/edit/${data.id}`, data);

/* Funcion para eliminar mediante el servidor un examen */
export const deleteExamnRequest = async (id) => axios.delete(`/exam/delete/${id}`);