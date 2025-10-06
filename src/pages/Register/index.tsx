import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = () => {
    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }
    if (password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const user = { email, password };
    localStorage.setItem("slasherUser", JSON.stringify(user));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-slasherRed">
      <div className="w-full max-w-md bg-gray-950 p-8 rounded-xl shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Slasher <span className="text-slasherRed">Register</span>
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
          />

          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleRegister}
            className="w-full py-2 mt-2 bg-slasherRed text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Registrar
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Já tem conta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-slasherRed hover:underline cursor-pointer"
            >
              Faça login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;