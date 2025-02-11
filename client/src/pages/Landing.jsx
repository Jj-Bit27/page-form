import { Button } from "../components/UI/Button.jsx";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { GoZap } from "react-icons/go";
import { useAuth } from "../context/authContext.jsx";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
        FormApp
      </h1>
      <p className="text-xl mb-8 max-w-2xl">
        Crea, comparte y analiza formularios con facilidad. Tu solución todo en
        uno para encuestas y recopilación de datos.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button asChild="true" size="lg" className="font-semibold">
          <Link
            to={isAuthenticated ? "/create-form" : "/login"}
            className="flex items-center"
          >
            Crear Formulario <FaArrowRightLong className="ml-2" size={15} />
          </Link>
        </Button>
        <Button
          asChild="true"
          variant="outline"
          size="lg"
          className="font-semibold"
        >
          <Link to="/">Documentacion</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
        <div className="flex items-center space-x-4 p-4 border rounded-lg bg-card">
          <FiFileText className="h-8 w-8 text-primary" />
          <div className="text-left">
            <h3 className="font-bold">Formularios Personalizables</h3>
            <p className="text-sm text-muted-foreground">
              Diseña formularios únicos que se ajusten a tus necesidades
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border rounded-lg bg-card">
          <GoZap className="h-8 w-8 text-primary" />
          <div className="text-left">
            <h3 className="font-bold">Análisis en Tiempo Real</h3>
            <p className="text-sm text-muted-foreground">
              Obtén insights instantáneos de las respuestas recibidas
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
