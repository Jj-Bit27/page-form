import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import handleEdit from "../lib/handleEdit.jsx";
import { getQuestionsRequest } from "../api/questions.js";
import { getExamnRequest } from "../api/examns.js";
import { getOptionsRequest } from "../api/options.js";

export default function Formulario() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const { data: dataExamn } = await getExamnRequest(id);
        const { data: dataQuestions } = await getQuestionsRequest(dataExamn.id);

        const updatedQuestions = await Promise.all(
          dataQuestions.result.map(async (question) => {
            if (question.tipo_respuestas === "options") {
              const { data: dataOptions } = await getOptionsRequest(
                question.id
              );
              question.opciones = dataOptions.result.map(
                (option) => option.titulo
              );
            }
            return question;
          })
        );

        setTitle(dataExamn.titulo);
        setDescription(dataExamn.descripcion);
        setQuestions(updatedQuestions);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchFormData();
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index][field] = value;
      return updatedQuestions;
    });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[qIndex].opciones[oIndex] = value;
      return updatedQuestions;
    });
  };

  const handleEditForm = async (id, id_que) => {
    await handleEdit(user, title, description, questions, id, id_que);
    navigate("/home");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-background mt-6 shadow-2xl rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Formulario</h1>

      <input
        type="text"
        placeholder="Título del formulario"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <textarea
        placeholder="Descripción del formulario"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      ></textarea>

      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-4 border rounded-lg">
          <input
            type="text"
            placeholder="Título de la pregunta"
            value={question.titulo}
            onChange={(e) =>
              handleQuestionChange(qIndex, "titulo", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={question.descripcion}
            onChange={(e) =>
              handleQuestionChange(qIndex, "descripcion", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          ></textarea>

          {question.tipo_respuesta === "options" ? (
            <div>
              {question.opciones.map((option, oIndex) => (
                <div key={oIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          ) : (
            <input
              type="text"
              placeholder="Respuesta abierta"
              className="w-full p-2 border rounded mt-2"
              disabled
            />
          )}
        </div>
      ))}

      <button
        onClick={handleEditForm}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
      >
        Guardar cambios
      </button>
    </div>
  );
}
