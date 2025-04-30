import { useState, useEffect } from "react";
import { FaWpforms, FaPlus, FaEllipsisH, FaSearch } from "react-icons/fa";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { Navbar } from "../components/UI/Navbar.jsx";
import { useAuth } from "../context/authContext.jsx";
import { getExamnsRequest, deleteExamnRequest } from "../api/examns.js";
import {
  deleteQuestionsRequest,
  getQuestionsRequest,
} from "../api/questions.js";
import { FormCard } from "../components/FormCard.jsx";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [examenes, setExamenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [num_respuestas, setNumRespuestas] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExamenes = async () => {
      const res = await getExamnsRequest();
      setExamenes(res.data);
      setLoading(false);
    };
    fetchExamenes();
  }, []);

  const handleEliminar = async (formId) => {
    const data = await getQuestionsRequest(formId);
    if (data.data.length > 0) {
      await deleteQuestionsRequest(formId);
    }
    await deleteExamnRequest(formId);
  };

  const filteredExamenes = examenes.filter((examen) =>
    examen.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-gray-800">Mis Exámenes</h1>
          <div className="flex gap-4">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Buscar exámenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FaSearch />}
              />
            </div>
            {user.isProfessor === true && (
              <a href="/forms/new">
                <Button>
                  <FaPlus className="mr-2" /> Nuevo
                </Button>
              </a>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : filteredExamenes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredExamenes.map((examen) => (
              <FormCard key={examen.id} examen={examen} num_respuestas />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center">
            <FaWpforms className="mb-4 text-6xl text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-700">
              No se encontraron exámenes
            </h3>
            <p className="mb-6 text-gray-500">
              {searchTerm
                ? "No hay resultados para tu búsqueda"
                : user.isProfessor === true
                ? "Comienza creando tu primer examen"
                : "Los profesores aún no han creado exámenes"}
            </p>
            {user.isProfessor === true && (
              <a href="/forms/new">
                <Button>
                  <FaPlus className="mr-2" /> Crear Examen
                </Button>
              </a>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
