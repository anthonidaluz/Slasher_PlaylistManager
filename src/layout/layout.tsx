import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header fixo */}
      <Header />

      {/* Conteúdo principal cresce e empurra o footer */}
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer sempre no rodapé */}
      <Footer />
    </div>
  );
}
