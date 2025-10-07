import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import SlasherLogo from "../../assets/Slasher_Logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) return;

    try {
      dispatch(login({ email: email.trim(), password }));
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message || "Credenciais inválidas");
    }
  };

  const goToRegister = () => navigate("/register");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-slasherRed relative overflow-hidden">
      {/* 🔹 Fundo sutil animado */}
      <div className="absolute inset-0 bg-gradient-to-t from-slasherRed/10 via-transparent to-transparent animate-pulseSlow"></div>

      {/* 🔹 Container principal */}
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-[0_0_40px_rgba(139,0,0,0.25)] w-full max-w-md border border-gray-800 animate-fadeIn">
        {/* Logo e título */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={SlasherLogo}
            alt="Slasher Logo"
            className="h-25 mb-4 animate-slideUp drop-shadow-[0_0_12px_rgba(139,0,0,0.6)]"
          />
          <h2 className="text-3xl font-bold text-white tracking-wide">
            Bem-vindo
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Faça login para continuar
          </p>
        </div>

        {/* Formulário */}
        <div className="space-y-5">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-slasherRedLight transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Senha</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-slasherRedLight transition-all duration-200"
            />
          </div>

          {/* Botão de Login */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-slasherRed to-red-700 hover:from-red-700 hover:to-slasherRedLight 
                       text-white font-semibold py-3 rounded-lg transition-all duration-300 
                       hover:shadow-[0_0_20px_rgba(139,0,0,0.6)] hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
          >
            Entrar
          </button>

          {/* Link para cadastro */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">Ainda não tem uma conta?</p>
            <button
              onClick={goToRegister}
              className="mt-2 text-slasherRedLight hover:text-slasherRed underline font-medium transition-all duration-200 cursor-pointer"
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
