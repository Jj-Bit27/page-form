import { FaWpforms } from "react-icons/fa";
import { Button } from "../components/UI/Button.jsx";
import { useAuth } from "../context/authContext.jsx";
import { FeatureCard } from "../components/FeatureCard.jsx";
import { Link } from "react-router-dom";

function Home() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaWpforms className="text-3xl text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">FormCreator</h1>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Link to="/" onClick={() => logout()}>
                <Button variant="outline">Cerrar Sesión</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className=" hover:text-primary">
                  <Button variant="outline">Iniciar Sesión</Button>
                </Link>
                <Link to="/register" className=" hover:text-primary">
                  <Button>Registrarse</Button>
                </Link>
              </>
            )}
          </div>
        </header>

        <main className="flex flex-col items-center">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-bold text-gray-800">
              Crea formularios fácilmente
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Diseña, comparte y analiza formularios de manera sencilla.
              Perfecto para encuestas, exámenes y recopilación de datos.
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              title="Diseño Intuitivo"
              description="Crea formularios profesionales sin conocimientos técnicos"
              icon="✏️"
            />
            <FeatureCard
              title="Análisis de Respuestas"
              description="Visualiza y exporta los resultados de tus formularios"
              icon="📊"
            />
            <FeatureCard
              title="Compartir Fácilmente"
              description="Distribuye tus formularios con un simple enlace"
              icon="🔗"
            />
          </div>

          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="large">Comenzar Ahora</Button>
            </Link>
          ) : (
            <>
              <Link to="/register" className=" hover:text-primary">
                <Button size="large">Comenzar Ahora</Button>
              </Link>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
