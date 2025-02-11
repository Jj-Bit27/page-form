import { editExamnRequest } from "../api/examns";
import { editQuestionRequest } from "../api/questions";

async function handleCreate(
  user,
  title,
  description,
  questions,
  id_exm,
  id_que
) {
  const { data } = await editExamnRequest({
    id: id_exm,
    id_maestro: user.id,
    titulo: title,
    descripcion: description,
    fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  const { data: dataQuestions } = await editQuestionRequest({
    id: id_que,
    id_examen: data.id,
    preguntas: questions,
  });
}

export default handleCreate;
