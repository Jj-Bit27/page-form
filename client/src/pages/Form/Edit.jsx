import { useState, useEffect } from "react";
import { FaSave, FaPlus, FaEye } from "react-icons/fa";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Navbar } from "../../components/UI/Navbar";
import { QuestionCard } from "../../components/QuestionCard";

import { useAuth } from "../../context/authContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import handleEdit from "../../lib/handleEdit.jsx";
import { getQuestionsRequest } from "../../api/questions.js";
import { getExamnRequest } from "../../api/examns.js";
import { getOptionsRequest } from "../../api/options.js";

export default function EditForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await getExamnRequest(id);
        const { data: dataQuestions } = await getQuestionsRequest(data.id);
        setFormTitle(data.titulo);
        setFormDescription(data.descripcion);

        const opcionesPreguntas = await Promise.all(
          dataQuestions.result.map(async (q) => {
            let options = [];
            let correctAnswers = [];

            if (
              q.tipo_respuestas === "checkbox" ||
              q.tipo_respuestas === "radio"
            ) {
              const { data: dataOptions } = await getOptionsRequest(q.id);

              options = dataOptions.map((option) => option);

              correctAnswers = dataOptions
                .filter((option) => option.correcta) // Solo opciones correctas
                .map((option) => option.opcion); // Nos quedamos con el texto
            } else {
              // Para preguntas de texto o párrafo
              options = q.opciones ? q.opciones.map((o) => o.opcion) : [];

              correctAnswers =
                q.tipo_respuestas === "text" ||
                q.tipo_respuestas === "paragraph"
                  ? q.respuesta_correcta || ""
                  : q.respuesta_correcta
                  ? [q.respuesta_correcta]
                  : [];
            }

            return {
              id: q.id,
              type: q.tipo_respuestas,
              title: q.titulo,
              required: q.obligatoria,
              options,
              correctAnswers,
            };
          })
        );

        setQuestions(opcionesPreguntas);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el examen:", error);
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const addQuestion = () => {
    const newId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        type: "text",
        title: "Pregunta sin título",
        required: false,
        options: [],
        correctAnswers: "",
      },
    ]);
  };

  const updateQuestion = (id, data) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          if (
            data.type &&
            ["radio", "checkbox", "select"].includes(data.type) &&
            (!q.options || q.options.length === 0)
          ) {
            return {
              ...q,
              ...data,
              options: ["Opción 1", "Opción 2"],
              correctAnswers: [],
            };
          }
          return { ...q, ...data };
        }
        return q;
      })
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const options = q.options || [];
          return {
            ...q,
            options: [...options, `Opción ${options.length + 1}`],
          };
        }
        return q;
      })
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          const oldValue = newOptions[optionIndex].opcion;
          newOptions[optionIndex].opcion = value || "";
          const newCorrectAnswers = Array.isArray(q.correctAnswers)
            ? q.correctAnswers.map((ans) => (ans === oldValue ? value : ans))
            : q.correctAnswers;
          return {
            ...q,
            options: newOptions,
            correctAnswers: newCorrectAnswers,
          };
        }
        return q;
      })
    );
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          const removedOption = newOptions[optionIndex];
          newOptions.splice(optionIndex, 1);
          const newCorrectAnswers = Array.isArray(q.correctAnswers)
            ? q.correctAnswers.filter((answer) => answer !== removedOption)
            : q.correctAnswers;
          return {
            ...q,
            options: newOptions,
            correctAnswers: newCorrectAnswers,
          };
        }
        return q;
      })
    );
  };

  const toggleCorrectAnswer = (questionId, option) => {
    setQuestions(
      questions.map((q) => {
        if (
          q.id === questionId &&
          ["radio", "checkbox", "select"].includes(q.type)
        ) {
          let correctAnswers = Array.isArray(q.correctAnswers)
            ? [...q.correctAnswers]
            : [];
          if (q.type === "radio" || q.type === "select") {
            return { ...q, correctAnswers: [option] };
          } else if (q.type === "checkbox") {
            const index = correctAnswers.indexOf(option);
            if (index === -1) {
              correctAnswers.push(option);
            } else {
              correctAnswers.splice(index, 1);
            }
            return { ...q, correctAnswers };
          }
        }
        return q;
      })
    );
  };

  const saveForm = async () => {
    try {
      await handleEdit(user, formTitle, formDescription, questions, id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al guardar el examen:", error);
    }
  };

  const previewForm = () => {
    navigate(`/forms/${id}/solve`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Cargando examen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Editar Examen</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={previewForm}>
              <FaEye className="mr-2" /> Vista Previa
            </Button>
            <Button onClick={saveForm}>
              <FaSave className="mr-2" /> Guardar
            </Button>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <Input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="mb-4 border-none text-2xl font-bold"
            placeholder="Título del examen"
          />
          <Input
            type="text"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="border-none text-gray-600"
            placeholder="Descripción del examen (opcional)"
          />
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              options={question.options.map((opcion) => {
                return opcion.opcion;
              })}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
              isOnly={questions.length === 1}
              addOption={addOption}
              updateOption={updateOption}
              removeOption={removeOption}
              toggleCorrectAnswer={toggleCorrectAnswer}
            />
          ))}
        </div>

        <div className="mt-6">
          <Button variant="outline" onClick={addQuestion}>
            <FaPlus className="mr-2" /> Añadir Pregunta
          </Button>
        </div>
      </main>
    </div>
  );
}
