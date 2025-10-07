import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-950 text-white px-8 py-4 flex justify-between items-center border-b border-gray-800 shadow-md">
      {/* Esquerda: Logo */}
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <img
          src="/src/assets/Slasher_Logo.png"
          alt="Slasher Logo"
          className="h-20 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Centro: Título */}
      <h1 className="text-2xl font-bold tracking-wide">
        <span className="text-white">Gerenciador de Playlists</span>
      </h1>

      {/* Direita: Navegação */}
      <nav className="flex items-center gap-8">
        {" "}
        {/* Aumentei o gap para 8 */}
        {/* Link de navegação com hover sutil */}
        <Link
          to="/aboutme"
          className="text-gray-300 hover:text-white transition-colors duration-200"
        >
          <strong>Sobre</strong>
        </Link>
        {/* Link de ação estilizado como um botão */}
        <Link
          to="/login"
          className="text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}
