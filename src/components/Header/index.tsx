import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SLASHER</h1>
      <nav className="flex gap-4">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/login" className="hover:text-gray-300">Login</Link>
        <Link to="/register" className="hover:text-gray-300">Registrar</Link>
      </nav>
    </header>
  );
}