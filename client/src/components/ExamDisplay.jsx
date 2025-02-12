import React from "react";
import QuestionDisplay from "./QuestionDisplay";

export function ExamDisplay({ titulo, descripcion, preguntas, opciones }) {
  return (
    <div className="w-full max-w-4xl mx-auto dark:bg-zinc-800 dark:text-white bg-gray-200 text-black p-6 rounded-xl shadow-lg shadow-zinc-500 dark:shadow-zinc-700">
      {/* Encabezado del examen */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {titulo}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{descripcion}</p>
      </div>

      {/* Lista de preguntas */}
      <div className="space-y-6">
        {preguntas.map((question, index) => (
          <QuestionDisplay
            key={question.id}
            question={question}
            number={index + 1}
            opciones={opciones}
          />
        ))}
      </div>
    </div>
  );
}
