import React from "react";

const QuestionDisplay = ({ question, number, opciones }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
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
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
