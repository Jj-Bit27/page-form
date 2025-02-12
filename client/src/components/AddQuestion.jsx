/* Exportamos bibliotecas y otros archivos */
import { useState } from "react";
import handleCreate from "../lib/handleCreate";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function Formulario() {
  /* Variables, estados y navegar en la pagina */
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  /* Funciones para manejar el formulario */
  const handleCreateForm = async () => {
    handleCreate(user, title, description, questions);
    navigate("/home");
  };

  /* Funciones para manejar los titulos de las preguntas */
  const handleTitleChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].titulo = value;
    setQuestions(updatedQuestions);
  };

  /* Funciones para manejar las descripciones de las preguntas */
  const handleDescriptionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].descripcion = value;
    setQuestions(updatedQuestions);
  };

  /* Funciones para manejar el tipo de respuesta de las preguntas */
  const handleTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].tipo_respuesta = value;
    if (value === "options") updatedQuestions[index].options = [""];
    setQuestions(updatedQuestions);
  };

  /* Funciones para manejar las si es obligatorio las preguntas */
  const handleMandatoryChange = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].obligatorio = !updatedQuestions[index].obligatorio;
    setQuestions(updatedQuestions);
  };

  /* Funciones para manejar las opciones de las preguntas */
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].opciones[oIndex] = value;
    updatedQuestions[qIndex].respuesta_correcta = value;
    setQuestions(updatedQuestions);
  };

  /* Funciones para manejar añadir opciones a las preguntas */
  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].opciones.push("");
    setQuestions(updatedQuestions);
  };

  /* Funciones para manejar eliminar opciones a las preguntas */
  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].opciones.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  /* Funciones para manejar añadir preguntas */
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        titulo: "",
        descripcion: "",
        tipo_respuesta: "open",
        opciones: [""],
        respuesta_correcta: "",
        obligatorio: false,
      },
    ]);
  };

  /* Funciones para manejar eliminar preguntas */
  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 dark:bg-zinc-800 dark:text-white bg-gray-200 text-black  mt-6 rounded-xl shadow-lg shadow-zinc-500 dark:shadow-zinc-700">
      <h1 className="text-2xl font-bold mb-4">Crear Formulario</h1>
      {/* Input para Título */}
      <input
        type="text"
        placeholder="Título del formulario"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 dark:bg-zinc-700 dark:text-white rounded-xl border border-gray-400 dark:border-gray-600"
      />

      {/* Input para Descripción */}
      <textarea
        placeholder="Descripción del formulario"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 dark:bg-zinc-700 dark:text-white rounded-xl border border-gray-400 dark:border-gray-600"
      ></textarea>
      {questions.map((question, qIndex) => (
        <div
          key={qIndex}
          className="mb-4 p-4 rounded-xl border border-gray-400 dark:border-gray-600"
        >
          <input
            type="text"
            placeholder="Título de la pregunta"
            value={question.title}
            onChange={(e) => handleTitleChange(qIndex, e.target.value)}
            className="w-full p-2 mb-2 dark:bg-zinc-700 dark:text-white rounded-xl border border-gray-400 dark:border-gray-600"
          />
          <textarea
            placeholder="Descripción (opcional)"
            value={question.description}
            onChange={(e) => handleDescriptionChange(qIndex, e.target.value)}
            className="w-full p-2 mb-2 dark:bg-zinc-700 dark:text-white rounded-xl border border-gray-400 dark:border-gray-600"
          ></textarea>
          <select
            value={question.type}
            onChange={(e) => handleTypeChange(qIndex, e.target.value)}
            className="w-1/3 p-1 mb-2 dark:bg-zinc-700 dark:text-white rounded-xl border border-gray-400 dark:border-gray-600"
          >
            <option value="open" className="text-black dark:text-white">
              Respuesta abierta
            </option>
            <option value="options" className="text-black dark:text-white">
              Opciones
            </option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={question.mandatory}
              onChange={() => handleMandatoryChange(qIndex)}
            />
            Obligatoria
          </label>
          {question.tipo_respuesta === "options" && (
            <div>
              {question.opciones.map((option, oIndex) => (
                <div key={oIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Opción ${oIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className="w-full mt-2 p-2 dark:bg-zinc-700 dark:text-white rounded-xl border border-gray-400 dark:border-gray-600"
                  />
                  <button
                    onClick={() => removeOption(qIndex, oIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addOption(qIndex)}
                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
              >
                <FaPlus size={15} />
              </button>
            </div>
          )}
          {question.tipo_respuesta === "open" && (
            <input
              type="text"
              placeholder="Escribe tu respuesta"
              value={question.answer}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[qIndex].respuesta_correcta = e.target.value;
                setQuestions(updatedQuestions);
              }}
              className="w-full p-2 mt-2 dark:bg-zinc-700 dark:text-white rounded-xl border border-gray-400 dark:border-gray-600"
            />
          )}
          <button
            onClick={() => removeQuestion(qIndex)}
            className="bg-red-500 text-white px-2 py-2 rounded mt-2"
          >
            <FaTrashAlt size={20} />
          </button>
        </div>
      ))}
      <button
        onClick={addQuestion}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Agregar Pregunta
      </button>
      <button
        onClick={() => handleCreateForm()}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
      >
        Terminar Edición
      </button>
    </div>
  );
}
