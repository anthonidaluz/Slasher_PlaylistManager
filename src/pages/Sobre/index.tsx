import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BookMarked, Target, CheckCircle, Code } from "lucide-react";

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <main className="flex-grow">
        <div className="text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Seção Principal */}
            <div className="text-center mb-16">
              <BookMarked size={48} className="mx-auto text-slasherRed mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Sobre este Projeto
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
                Esta aplicação foi desenvolvida como atividade avaliativa para a
                unidade curricular de{" "}
                <strong>Tópicos Especiais em Programação</strong>, do 8º
                semestre do curso de{" "}
                <strong>Bacharelado em Ciência da Computação</strong> do{" "}
                <strong>
                  Instituto Federal de Santa Catarina - Câmpus Lages
                </strong>
                . O projeto foi orientado pela docente{" "}
                <strong>Drª Lidiane Visintin</strong>.
              </p>
            </div>

            {/* Objetivo do Projeto */}
            <div className="mb-16">
              <div className="text-center">
                <Target size={40} className="mx-auto text-slasherRed mb-4" />
                <h2 className="text-3xl font-bold text-center mb-4">
                  Objetivo Principal
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  O objetivo central foi desenvolver uma aplicação web em React
                  para criar e gerenciar playlists de músicas, integrando
                  tecnologias modernas do ecossistema, como Redux para
                  gerenciamento de estado, React Router para navegação e consumo
                  de dados de uma API externa (TheAudioDB).
                </p>
              </div>
            </div>

            {/* Requisitos Avaliados */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8">
                Requisitos e Funcionalidades Implementadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    Autenticação e Rotas
                  </h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Implementação de autenticação de usuários.</li>
                    <li>Criação de rotas protegidas para acesso restrito.</li>
                    <li>
                      Uso de `sessionStorage` para dados temporários da sessão.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    Gerenciamento de Playlists
                  </h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Operações de CRUD (Criar, Ler, Atualizar, Deletar).</li>
                    <li>
                      Persistência de dados das playlists via `LocalStorage`.
                    </li>
                    <li>
                      Restrição de acesso para que o usuário só veja suas
                      próprias playlists.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    API e Estado Global
                  </h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Consumo de dados em tempo real da API TheAudioDB.</li>
                    <li>
                      Gerenciamento do estado global da aplicação com Redux.
                    </li>
                    <li>
                      Sincronização do estado do Redux com o `LocalStorage`.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <CheckCircle size={20} className="text-green-500 mr-3" />
                    Busca e Interatividade
                  </h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Busca de músicas por artista, gênero ou nome.</li>
                    <li>Exibição de resultados em tempo real.</li>
                    <li>
                      Listagem das músicas mais populares, conforme a API.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Seção de Tecnologias */}
            <div className="text-center">
              <Code size={40} className="mx-auto text-slasherRed mb-4" />
              <h2 className="text-3xl font-bold mb-8">
                Tecnologias Utilizadas
              </h2>
              <div className="flex justify-center flex-wrap gap-x-6 gap-y-4">
                <span className="bg-gray-700 text-gray-200 text-sm font-medium px-4 py-2 rounded-full">
                  React
                </span>
                <span className="bg-gray-700 text-gray-200 text-sm font-medium px-4 py-2 rounded-full">
                  TypeScript
                </span>
                <span className="bg-gray-700 text-gray-200 text-sm font-medium px-4 py-2 rounded-full">
                  Redux Toolkit
                </span>
                <span className="bg-gray-700 text-gray-200 text-sm font-medium px-4 py-2 rounded-full">
                  React Router
                </span>
                <span className="bg-gray-700 text-gray-200 text-sm font-medium px-4 py-2 rounded-full">
                  Tailwind CSS
                </span>
                <span className="bg-gray-700 text-gray-200 text-sm font-medium px-4 py-2 rounded-full">
                  Vite
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
