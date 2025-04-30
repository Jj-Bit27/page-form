import { useState, useEffect } from "react";
import { FaWpforms, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsRequest } from "../../api/questions.js";
import { getExamnRequest } from "../../api/examns.js";
import { getOptionsRequest } from "../../api/options.js";
import { addAnswerRequest } from "../../api/answers.js";

export default function SolveForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await getExamnRequest(id);
        const { data: dataQuestions } = await getQuestionsRequest(data.id);
        const questions = dataQuestions.result;

        const opcionesPreguntas = await Promise.all(
          questions.map(async (q) => {
            let options = [];
            let correctAnswers = [];

            if (
              q.tipo_respuestas === "checkbox" ||
              q.tipo_respuestas === "radio"
            ) {
              const { data: dataOptions } = await getOptionsRequest(q.id);

              options = dataOptions.map((option) => option.opcion);

              correctAnswers = dataOptions
                .filter((option) => option.correcta) // Solo opciones correctas
                .map((option) => option.opcion); // Nos quedamos con el texto
            } else {
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

        setExam({
          id: data.id,
          title: data.titulo,
          description: data.descripcion,
          questions: opcionesPreguntas,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el examen:", error);
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleTextChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
    }
  };

  const handleRadioChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (questionId, value, checked) => {
    const currentValues = answers[questionId] || [];
    let newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    setAnswers({ ...answers, [questionId]: newValues });
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
    }
  };

  const handleSelectChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (exam) {
      exam.questions.forEach((question) => {
        if (question.required) {
          const answer = answers[question.id];
          if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            newErrors[question.id] = "Esta pregunta es obligatoria";
            isValid = false;
          }
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const responseData = {
        id_examen: exam.id,
        id_estudiante: user.id,
        respuestas: Object.keys(answers).map((questionId) => ({
          id_pregunta: parseInt(questionId),
          respuesta: Array.isArray(answers[questionId])
            ? JSON.stringify(answers[questionId])
            : answers[questionId],
        })),
      };

      await addAnswerRequest(responseData);
      navigate(`/forms/${id}/submitted`);
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
    } finally {
      setSubmitting(false);
    }
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
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/dashboard" className="flex items-center gap-2">
            <FaWpforms className="text-2xl text-purple-600" />
            <span className="text-xl font-bold text-gray-800">FormCreator</span>
          </a>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <a
          href="/dashboard"
          className="mb-6 flex items-center text-purple-600 hover:text-purple-700"
        >
          <FaArrowLeft className="mr-2" /> Volver al dashboard
        </a>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            {exam.title}
          </h1>
          <p className="text-gray-600">{exam.description}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {exam.questions.map((question) => (
              <div
                key={question.id}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {question.title}
                    {question.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </h3>
                </div>

                <div className="pl-0">
                  {question.type === "text" && (
                    <Input
                      type="text"
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        handleTextChange(question.id, e.target.value)
                      }
                      error={errors[question.id]}
                    />
                  )}

                  {question.type === "paragraph" && (
                    <textarea
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        handleTextChange(question.id, e.target.value)
                      }
                      className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                        errors[question.id] ? "border-red-500" : ""
                      }`}
                      rows={4}
                    ></textarea>
                  )}

                  {question.type === "radio" && (
                    <div className="space-y-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            id={`question-${question.id}-option-${index}`}
                            name={`question-${question.id}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={() =>
                              handleRadioChange(question.id, option)
                            }
                            className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label
                            htmlFor={`question-${question.id}-option-${index}`}
                            className="ml-2 block text-gray-700"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                      {errors[question.id] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[question.id]}
                        </p>
                      )}
                    </div>
                  )}

                  {question.type === "checkbox" && (
                    <div className="space-y-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`question-${question.id}-option-${index}`}
                            value={option}
                            checked={(answers[question.id] || []).includes(
                              option
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                question.id,
                                option,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <label
                            htmlFor={`question-${question.id}-option-${index}`}
                            className="ml-2 block text-gray-700"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                      {errors[question.id] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[question.id]}
                        </p>
                      )}
                    </div>
                  )}

                  {question.type === "select" && (
                    <div>
                      <select
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleSelectChange(question.id, e.target.value)
                        }
                        className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                          errors[question.id] ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Seleccionar...</option>
                        {question.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[question.id] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[question.id]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" loading={submitting}>
              <FaPaperPlane className="mr-2" /> Enviar Respuestas
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
