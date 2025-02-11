import axios from "./axios";

export const getExamnsRequest = async () => axios.get(`/exam/gets`);

export const getExamnRequest = async (id) =>
  axios.get(`/exam/get/${id}`);

export const addExamnRequest = async (data) => axios.post(`/exam/add`, data);

export const editExamnRequest = async (data) => axios.put(`/exam/edit/${data.id}`, data);

export const deleteExamnRequest = async (id) => axios.delete(`/exam/delete/${id}`);