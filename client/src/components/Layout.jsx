import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { Button } from "./UI/Button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "./UI/Sheet.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../context/authContext.jsx";

export default function Layout({ children }) {
  const [theme, setTheme] = useState("light");
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const NavItems = () => (
    <>
      <Link to="/" className="hover:text-primary">
        Inicio
      </Link>
      <Link to="/home" className=" hover:text-primary">
        Formularios
      </Link>
      {isAuthenticated ? (
        <Link to="/" onClick={() => logout()}>
          Logout
        </Link>
      ) : (
        <Link to="/login" className=" hover:text-primary">
          Iniciar Sesión
        </Link>
      )}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-300 dark:bg-zinc-900 dark:text-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            FormApp
          </Link>
          <nav className="hidden md:flex space-x-4 items-center">
            <NavItems />
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
            </Button>
          </nav>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <IoMdMenu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col space-y-4 mt-6">
                <NavItems />
                {/* Botón para cambiar el tema dentro del menú desplegable */}
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleTheme}
                  className="justify-start dark:text-white"
                >
                  {theme === "light" ? (
                    <>
                      <FaMoon size={15} className="mr-2" /> Modo oscuro
                    </>
                  ) : (
                    <>
                      <FaSun size={15} className="mr-2" /> Modo claro
                    </>
                  )}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      {children}
      <Footer />
    </div>
  );
}
