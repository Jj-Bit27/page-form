import { useState } from "react";
import { FaWpforms, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/dashboard" className="flex items-center gap-2">
              <FaWpforms className="text-2xl text-purple-600" />
              <span className="text-xl font-bold text-gray-800">
                FormCreator
              </span>
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="/dashboard"
                className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
              >
                Mis Formularios
              </a>
              <div className="relative ml-3">
                <button
                  className="flex rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <FaUser className="h-6 w-6" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </a>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Configuración
                    </a>
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => logout()}
                    >
                      Cerrar Sesión
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Mis Formularios
            </a>{" "}
            <a
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Mi Perfil
            </a>
            <a
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Configuración
            </a>
            <a
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => logout()}
            >
              Cerrar Sesión
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
