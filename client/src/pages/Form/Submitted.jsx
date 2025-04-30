import { FaWpforms, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { Button } from "../../components/UI/Button";
import { useParams } from "react-router-dom";

export default function SubmittedForm() {
  const { id } = useParams();

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

      <div className="container mx-auto flex flex-col items-center px-4 py-16">
        <div className="mb-8 flex flex-col items-center justify-center rounded-full bg-green-100 p-6">
          <FaCheckCircle className="text-6xl text-green-500" />
        </div>

        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
          ¡Respuestas enviadas!
        </h1>
        <p className="mb-8 max-w-md text-center text-gray-600">
          Tus respuestas han sido registradas correctamente. Gracias por
          completar este examen.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="/dashboard">
            <Button variant="outline">
              <FaArrowLeft className="mr-2" /> Volver al Dashboard
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
