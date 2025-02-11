import { addExamnRequest } from "../api/examns";
import { addQuestionRequest } from "../api/questions";

async function handleCreate(user, title, description, questions) {
  const { data } = await addExamnRequest({
    id_maestro: user.id,
    titulo: title,
    descripcion: description,
    fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  const { data: dataQuestions } = await addQuestionRequest({
    id_examen: data.id,
    preguntas: questions,
  });
}

export default handleCreate;
