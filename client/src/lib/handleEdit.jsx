import { editExamnRequest } from "../api/examns";
import { editQuestionRequest } from "../api/questions";
import { editOptionRequest } from "../api/options";

async function handleCreate(user, title, description, questions, id_exm) {
  const { data } = await editExamnRequest({
    id: id_exm,
    id_maestro: user.id,
    titulo: title,
    descripcion: description,
    fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  for (const pregunta of questions) {
    const { data: dataQuestions } = await editQuestionRequest({
      id: pregunta.id,
      id_examen: data.id,
      title: pregunta.title,
      type: pregunta.type,
      correctAnswers: pregunta.correctAnswers,
      required: pregunta.required,
    });

    if (pregunta.type === "checkbox" || pregunta.type === "radio") {
      for (const option of pregunta.options) {
        await editOptionRequest({
          id: option.id,
          opcion: option.opcion,
          correcta: pregunta.correctAnswers == option.opcion,
        });
      }
    }
  }
}

export default handleCreate;
