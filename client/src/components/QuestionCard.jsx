import { Select } from "./UI/Select";
import { FaPlus, FaTrash, FaGripLines, FaCheck } from "react-icons/fa";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";

export function QuestionCard({
  question,
  options,
  updateQuestion,
  removeQuestion,
  isOnly,
  addOption,
  updateOption,
  removeOption,
  toggleCorrectAnswer,
}) {
  const questionTypes = [
    { value: "text", label: "Texto corto" },
    { value: "paragraph", label: "Párrafo" },
    { value: "radio", label: "Opción múltiple" },
    { value: "checkbox", label: "Casillas de verificación" },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center">
        <FaGripLines className="mr-3 text-gray-400" />
        <div className="flex-1">
          <Input
            type="text"
            value={question.title}
            onChange={(e) =>
              updateQuestion(question.id, { title: e.target.value })
            }
            className="border-none text-lg font-medium"
            placeholder="Pregunta sin título"
          />
        </div>
        <div className="ml-4 w-40">
          <Select
            value={question.type}
            onChange={(value) => updateQuestion(question.id, { type: value })}
            options={questionTypes}
          />
        </div>
      </div>

      <div className="mb-4 pl-8">
        {question.type === "text" && (
          <Input
            type="text"
            value={question.correctAnswers || ""}
            onChange={(e) =>
              updateQuestion(question.id, { correctAnswers: e.target.value })
            }
            placeholder="Ingresa la respuesta correcta"
          />
        )}
        {question.type === "paragraph" && (
          <Input
            type="text"
            value={question.correctAnswers || ""}
            onChange={(e) =>
              updateQuestion(question.id, { correctAnswers: e.target.value })
            }
            placeholder="Ingresa la respuesta correcta"
            label="Respuesta correcta"
          />
        )}
        {(question.type === "radio" || question.type === "checkbox") && (
          <div className="space-y-2">
            {(options || []).map((option, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`mr-2 h-4 w-4 flex items-center justify-center rounded${
                    question.type === "checkbox" ? "" : "-full"
                  } border border-gray-300 cursor-pointer ${
                    (question.correctAnswers || []).includes(option)
                      ? "bg-purple-600 border-purple-600"
                      : ""
                  }`}
                  onClick={() => toggleCorrectAnswer(question.id, option)}
                >
                  {(question.correctAnswers || []).includes(option) && (
                    <FaCheck className="h-2 w-2 text-white" />
                  )}
                </div>
                <Input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    updateOption(question.id, index, e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  variant="text"
                  size="small"
                  onClick={() => removeOption(question.id, index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button
              variant="text"
              size="small"
              onClick={() => addOption(question.id)}
            >
              <FaPlus className="mr-1" /> Añadir opción
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pl-8">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`required-${question.id}`}
            checked={question.required}
            onChange={(e) =>
              updateQuestion(question.id, { required: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-purple-600"
          />
          <label
            htmlFor={`required-${question.id}`}
            className="ml-2 text-sm text-gray-700"
          >
            Obligatorio
          </label>
        </div>
        {!isOnly && (
          <Button
            variant="text"
            size="small"
            onClick={() => removeQuestion(question.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash className="mr-1" /> Eliminar
          </Button>
        )}
      </div>
    </div>
  );
}
