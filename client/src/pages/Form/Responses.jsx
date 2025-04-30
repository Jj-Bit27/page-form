import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaDownload,
  FaChartBar,
  FaListAlt,
  FaUser,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { Button } from "../../components/UI/Button";
import { Navbar } from "../../components/UI/Navbar";
import { getAnswersRequest } from "../../api/answers";
import { getExamnRequest } from "../../api/examns";
import { getQuestionsRequest } from "../../api/questions";
import { getOptionsRequest } from "../../api/options";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function FormResponses() {
  const { id } = useParams();
  const { user } = useAuth();
  const [exam, setExam] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("summary");
  const [selectedResponse, setSelectedResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

        const { data: responsesResponse } = await getAnswersRequest(id);
        const respuestasPorPersona = responsesResponse.reduce((acc, res) => {
          if (!acc[res.id_persona]) {
            acc[res.id_persona] = {
              id: res.id_estudiante,
              user: user.name,
              email: user.email,
              date: res.fecha,
              respuestas: [],
            };
          }
          acc[res.id_persona].respuestas.push(res);
          return acc;
        }, {});

        // Transforma el agrupamiento en el formato que necesitas
        const responses = Object.values(respuestasPorPersona).map((persona) => {
          const answers = {};
          persona.respuestas.forEach((res) => {
            answers[res.id_pregunta] =
              res.tipo_respuestas === "checkbox"
                ? JSON.parse(res.respuesta)
                : res.respuesta;
          });

          return {
            id: persona.id,
            user: persona.user,
            email: persona.email,
            date: persona.date,
            answers,
          };
        });

        setResponses(responses);

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleExportCSV = () => {
    alert("Exportando respuestas a CSV...");
    // Implementar lógica real de exportación si es necesario
  };

  const viewIndividualResponse = (responseId) => {
    setSelectedResponse(responseId);
    setView("individual");
  };

  const backToSummary = () => {
    setSelectedResponse(null);
    setView("summary");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Cargando respuestas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <a
          href="/dashboard"
          className="mb-6 flex items-center text-purple-600 hover:text-purple-700"
        >
          <FaArrowLeft className="mr-2" /> Volver al dashboard
        </a>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{exam.title}</h1>
            <p className="text-gray-600">{exam.description}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportCSV}>
              <FaDownload className="mr-2" /> Exportar CSV
            </Button>
            <div className="flex rounded-md border border-gray-300">
              <Button
                variant={view === "summary" ? "primary" : "outline"}
                className={`rounded-r-none ${
                  view === "summary" ? "" : "border-r-0"
                }`}
                onClick={() => setView("summary")}
              >
                <FaChartBar className="mr-2" /> Resumen
              </Button>
              <Button
                variant={view === "individual" ? "primary" : "outline"}
                className={`rounded-l-none ${
                  view === "individual" ? "" : "border-l-0"
                }`}
                onClick={() => setView("individual")}
              >
                <FaListAlt className="mr-2" /> Respuestas
              </Button>
            </div>
          </div>
        </div>

        {view === "summary" ? (
          <div className="space-y-8">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Resumen de Respuestas
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-purple-50 p-4">
                  <p className="text-sm text-gray-600">Total de respuestas</p>
                  <p className="text-3xl font-bold text-purple-700">
                    {responses.length}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-600">Última respuesta</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {responses[0]
                      ? new Date(responses[0].date).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-gray-600">Tasa de finalización</p>
                  <p className="text-3xl font-bold text-green-700">100%</p>
                </div>
              </div>
            </div>

            {exam.questions.map((question) => (
              <div
                key={question.id}
                className="rounded-lg bg-white p-6 shadow-md"
              >
                <h3 className="mb-4 text-lg font-medium text-gray-800">
                  {question.title}
                </h3>

                {question.type === "radio" || question.type === "select" ? (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-600">
                      Distribución de respuestas
                    </h4>
                    <div className="space-y-3">
                      {question.options.map((option) => {
                        const count = responses.filter(
                          (r) => r.answers[question.id] === option
                        ).length;
                        const percentage = responses.length
                          ? (count / responses.length) * 100
                          : 0;
                        return (
                          <div key={option}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">
                                {option}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {count} respuestas
                              </span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-full rounded-full bg-purple-600"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : question.type === "checkbox" ? (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-600">
                      Opciones seleccionadas
                    </h4>
                    <div className="space-y-3">
                      {question.options.map((option) => {
                        const count = responses.filter(
                          (r) =>
                            Array.isArray(r.answers[question.id]) &&
                            r.answers[question.id].includes(option)
                        ).length;
                        const percentage = responses.length
                          ? (count / responses.length) * 100
                          : 0;
                        return (
                          <div key={option}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">
                                {option}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {count} respuestas
                              </span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-full rounded-full bg-purple-600"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-600">
                      Respuestas de texto
                    </h4>
                    <div className="max-h-60 overflow-y-auto rounded-md border border-gray-200 p-3">
                      {responses.map((response) => (
                        <div
                          key={response.id}
                          className="mb-2 border-b border-gray-100 pb-2 last:border-0 last:pb-0"
                        >
                          <p className="text-sm text-gray-800">
                            {response.answers[question.id]}
                          </p>
                          <p className="text-xs text-gray-500">
                            {response.user} -{" "}
                            {new Date(response.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : selectedResponse ? (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <button
              onClick={backToSummary}
              className="mb-4 flex items-center text-purple-600 hover:text-purple-700"
            >
              <FaArrowLeft className="mr-2" /> Volver a todas las respuestas
            </button>

            {(() => {
              const response = responses.find((r) => r.id === selectedResponse);
              if (!response) return <p>Respuesta no encontrada</p>;

              return (
                <div>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Respuesta de {response.user}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FaUser className="mr-1" /> {response.email}
                        </span>
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1" />{" "}
                          {new Date(response.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {exam.questions.map((question) => {
                      const isCorrect =
                        question.type === "checkbox"
                          ? JSON.stringify(
                              response.answers[question.id]?.sort()
                            ) ===
                            JSON.stringify(
                              JSON.parse(question.correctAnswer || "[]").sort()
                            )
                          : response.answers[question.id] ===
                            question.correctAnswer;

                      return (
                        <div
                          key={question.id}
                          className="border-b border-gray-100 pb-4 last:border-0"
                        >
                          <h3 className="mb-2 text-lg font-medium text-gray-800">
                            {question.title}
                          </h3>

                          {question.type === "text" ||
                          question.type === "paragraph" ? (
                            <div className="flex items-center">
                              <p className="text-gray-700">
                                {response.answers[question.id]}
                              </p>
                              {question.correctAnswer && (
                                <span className="ml-2">
                                  {isCorrect ? (
                                    <FaCheck className="text-green-500" />
                                  ) : (
                                    <FaTimes className="text-red-500" />
                                  )}
                                </span>
                              )}
                            </div>
                          ) : question.type === "radio" ||
                            question.type === "select" ? (
                            <div className="flex items-center">
                              <p className="text-gray-700">
                                {response.answers[question.id]}
                              </p>
                              {question.correctAnswer && (
                                <span className="ml-2">
                                  {isCorrect ? (
                                    <FaCheck className="text-green-500" />
                                  ) : (
                                    <FaTimes className="text-red-500" />
                                  )}
                                </span>
                              )}
                            </div>
                          ) : question.type === "checkbox" ? (
                            <div className="space-y-1">
                              {question.options.map((option) => (
                                <div key={option} className="flex items-center">
                                  {response.answers[question.id]?.includes(
                                    option
                                  ) ? (
                                    <FaCheck className="mr-2 text-green-500" />
                                  ) : (
                                    <FaTimes className="mr-2 text-gray-300" />
                                  )}
                                  <span className="text-gray-700">
                                    {option}
                                  </span>
                                </div>
                              ))}
                              {question.correctAnswer && (
                                <span className="ml-2">
                                  {isCorrect ? (
                                    <FaCheck className="text-green-500" />
                                  ) : (
                                    <FaTimes className="text-red-500" />
                                  )}
                                </span>
                              )}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Todas las Respuestas
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Usuario
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {responses.map((response) => (
                    <tr key={response.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {response.user}
                            </div>
                            <div className="text-sm text-gray-500">
                              {response.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(response.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(response.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Completado
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => viewIndividualResponse(response.id)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
