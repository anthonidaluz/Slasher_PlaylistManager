// src/components/Footer/index.jsx

import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white border-t border-gray-800 z-50">
      <div className="container mx-auto px-6 py-2 flex flex-col sm:flex-row justify-between items-center">
        {/* Lado Esquerdo: Copyright */}
        <div className="flex-grow text-center mb-2 sm:mb-0">
          <p className="text-sm text-gray-400 tracking-wide">
            &copy; {currentYear}{" "}
            <span className="text-white font-semibold">Slasher</span>. Todos os
            direitos reservados.
          </p>
        </div>

        {/* Lado Direito: Links de Redes Sociais */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/anthonidaluz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-slasherRed transition-all duration-300 transform hover:scale-110"
            aria-label="Link para o GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.instagram.com/anthoni.luz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-slasherRed transition-all duration-300 transform hover:scale-110"
            aria-label="Link para o Twitter"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/anthoni-da-luz-6b0b03256/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-slasherRed transition-all duration-300 transform hover:scale-110"
            aria-label="Link para o LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
