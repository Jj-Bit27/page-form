import { useState } from "react";
import { FaSave, FaPlus } from "react-icons/fa";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Navbar } from "../../components/UI/Navbar";
import handleCreate from "../../lib/handleCreate";
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "../../components/QuestionCard.jsx";

export default function NewForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formTitle, setFormTitle] = useState("Examen sin título");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "text",
      title: "Pregunta sin título",
      required: false,
      options: [],
      correctAnswers: [],
    },
  ]);

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
        correctAnswers: [],
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
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
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
          newOptions.splice(optionIndex, 1);
          const newCorrectAnswers = q.correctAnswers.filter(
            (answer) => answer !== q.options[optionIndex]
          );
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
        if (q.id === questionId) {
          const correctAnswers = [...(q.correctAnswers || [])];
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
      handleCreate(user, formTitle, formDescription, questions);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al guardar el examen:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Crear Examen</h1>
          <Button onClick={saveForm}>
            <FaSave className="mr-2" /> Guardar
          </Button>
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
                return opcion;
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
