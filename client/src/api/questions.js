import axios from "./axios";

export const getQuestionsRequest = async (id_examen) => axios.get(`/question/gets/${id_examen}}`);

export const getQuestionRequest = async (id) => axios.get(`/question/get/${id}}`);

export const addQuestionRequest = async (data) => axios.post(`/question/add`, data);

export const editQuestionRequest = async (data) => {
  console.log(data)
  axios.put(`/question/edit/${data.id}`, data);
}

export const deleteQuestionRequest = async (id) => axios.delete(`/question/delete/${id}`);

export const deleteQuestionsRequest = async (id_examen) => axios.delete(`/question/deletes/${id_examen}`);