import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FaWpforms, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { Checkbox } from "../components/UI/Checkbox";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup, errors: registerErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const value = { name, email, password, isProfessor };
    await signup(value);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center">
          <a href="/" className="flex items-center gap-2">
            <FaWpforms className="text-3xl text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">FormCreator</h1>
          </a>
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Crear Cuenta
          </h2>
        </div>
        {registerErrors && (
          <p className="text-sm text-red-500 mt-2 text-center">
            {registerErrors}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Nombre Completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              icon={<FaUser />}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <Input
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<FaEnvelope />}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<FaLock />}
              placeholder="••••••••"
            />
          </div>

          <div>
            <Checkbox
              id="is-teacher"
              checked={isProfessor}
              onChange={() => setIsProfessor(!isProfessor)}
              label="Soy profesor (puedo crear formularios)"
            />
          </div>

          <Button type="submit" fullWidth loading={loading}>
            Registrarse
          </Button>

          <div className="mt-4 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Inicia Sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
