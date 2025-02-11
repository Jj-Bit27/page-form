import { useAuth } from "../context/authContext.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getExamnsRequest,
  deleteExamnRequest,
  getExamnRequest,
} from "../api/examns.js";
import {
  deleteQuestionsRequest,
  getQuestionsRequest,
} from "../api/questions.js";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formularios, setFormularios] = useState([]);

  const obtenerFormuarios = async () => {
    const res = await getExamnsRequest();
    setFormularios(res.data);
  };

  useEffect(() => {
    obtenerFormuarios();
  }, []);

  const handleFormClick = (formId) => {
    navigate(`/formulario/${formId}`);
  };

  const handleEliminar = async (formId) => {
    const data = await getQuestionsRequest(formId);
    if (data.data.length > 0) {
      await deleteQuestionsRequest(formId);
    }
    await deleteExamnRequest(formId);
  };

  return (
    <div className=" bg-background flex flex-col justify-between">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Bienvenido a la Página de Formularios
        </h1>
        <p className="text-lg text-center mb-4">
          Selecciona un formulario para continuar.
        </p>
        {formularios?.length <= 0 &&
          (user.isProfessor ? (
            <div className="flex justify-center">
              <Link
                to="/create-form"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
              >
                Crear formulario
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                to="/home"
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-200"
              >
                Responder formulario
              </Link>
            </div>
          ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {formularios?.map((form) => (
            <div
              key={form.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-2xl hover:shadow-xl transition duration-200 cursor-pointer"
              onClick={() => handleFormClick(form.id)}
            >
              <h2 className="text-xl font-bold mb-2">{form.titulo}</h2>
              <p className="text-gray-600">{form.descripcion}</p>

              <div className="flex gap-2 mt-4">
                {user.isProfessor === true ? (
                  <>
                    {/* Botón de Editar con event.stopPropagation() */}
                    <Link
                      to={`/editar-formulario/${form.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Editar
                    </Link>

                    {/* Botón de Eliminar con event.stopPropagation() */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEliminar(form.id);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </>
                ) : (
                  <Link
                    to={`/formulario/${form.id}`}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Responder
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {formularios?.length > 0 && (
        <div className="fixed bottom-6 right-6">
          {user.isProfessor === true ? (
            <Link
              to="/create-form"
              className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
            >
              Crear formulario
            </Link>
          ) : (
            <Link
              to="/home"
              className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
            >
              Responder Formulario
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
