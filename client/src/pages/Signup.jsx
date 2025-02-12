import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [error, setError] = useState("");

  const { signup, errors: registerErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    const value = { name, email, password, isProfessor };
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  return (
    <main className="flex flex-grow items-center justify-center">
      <div className="w-[450px] shadow-2xl shadow-zinc-500 dark:shadow-zinc-700 rounded-xl p-6 text-center dark:bg-zinc-800 dark:text-white bg-gray-200 text-black">
        <h2 className="text-xl font-bold">Registro</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Crea una nueva cuenta
        </p>
        {registerErrors && (
          <p className="text-sm text-red-500 mt-2">{registerErrors}</p>
        )}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4 text-left">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="tu nombre"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-zinc-700 dark:text-white"
            />
          </div>
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
              placeholder="correo@test.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-zinc-700 dark:text-white"
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
              placeholder="********"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-zinc-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-zinc-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <input
              id="professor"
              type="checkbox"
              checked={isProfessor}
              onChange={(e) => setIsProfessor(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="professor"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Soy profesor
            </label>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-emerald-600 text-white py-2 px-4 rounded-xl hover:bg-emerald-700"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-emerald-600 hover:underline">
            Ingresa
          </Link>
        </p>
      </div>
    </main>
  );
}
