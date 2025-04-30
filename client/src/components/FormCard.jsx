import { useNavigate } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { Button } from "./UI/Button";
import { useAuth } from "../context/authContext";

export function FormCard({ examen }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCardClick = () => {
    navigate(`/forms/${examen.id}/solve`);
  };

  return (
    <div
      className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {examen.titulo}
          </h3>
          <button
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FaEllipsisH />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 flex justify-between text-sm text-gray-500">
          <span>
            Actualizado: {new Date(examen.fecha).toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-2">
          {user.isProfessor === true && (
            <>
              <a
                href={`/forms/${examen.id}/edit`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button variant="outline" size="small">
                  Editar
                </Button>
              </a>
              <a
                href={`/forms/${examen.id}/responses`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button size="small">Ver Respuestas</Button>
              </a>
            </>
          )}
          {!user.isProfessor === true && (
            <a
              href={`/forms/${examen.id}/solve`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button size="small">Responder Formulario</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
