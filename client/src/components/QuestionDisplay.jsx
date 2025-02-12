import React from "react";

const QuestionDisplay = ({ question, number, opciones }) => {
  return (
    <div className="border p-4 border-gray-300 dark:border-gray-600 rounded-xl shadow-md dark:shadow-zinc-900 dark:bg-zinc-800 dark:text-white bg-gray-200 text-black">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">
          Pregunta {number}: {question.titulo}
        </h3>
        {question.description && (
          <p className="text-gray-600">{question.descripcion}</p>
        )}
      </div>
      <div>
        {question.tipo_respuestas === "option" && opciones ? (
          <div className="space-y-2">
            {opciones.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${question.id}-${option.id}`}
                  name={`question-${question.id}`}
                  value={option.id}
                  className="w-4 h-4"
                />
                <label
                  htmlFor={`${question.id}-${option.id}`}
                  className="text-gray-800 dark:text-gray-200"
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <textarea
            placeholder="Escribe tu respuesta aquí..."
            className="dark:bg-zinc-700 dark:text-white rounded-xl w-full p-2 border border-gray-300 dark:border-gray-600"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
