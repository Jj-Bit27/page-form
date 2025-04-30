import { addExamnRequest } from "../api/examns";
import { addQuestionRequest } from "../api/questions";
import { addOptionRequest } from "../api/options";

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

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const preguntaId = dataQuestions.preguntasIds[i];

    if (question.options) {
      const { data: dataOptions } = await addOptionRequest({
        id_pregunta: preguntaId,
        preguntas: [question], // Solo esta pregunta
      });
    }
  }
}

export default handleCreate;
