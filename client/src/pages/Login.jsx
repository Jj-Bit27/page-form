import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    signin(data);
  };

  return (
    <main className="flex flex-grow items-center justify-center">
      <div className="w-[350px] shadow-2xl rounded-lg p-6 text-center dark:bg-gray-800 dark:text-white bg-white text-black">
        <h2 className="text-xl font-bold">Iniciar Sesión</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ingrese sus credenciales para acceder a su cuenta
        </p>
        {loginErrors.map((error, i) => (
          <p className="text-sm text-red-500 mt-2" key={i}>
            {error}
          </p>
        ))}
        <form onSubmit={handleSubmit} className="mt-4 text-left">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-4 text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
