import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../../store";

// Ações do Redux para playlists e músicas
import {
  addPlaylist,
  editPlaylist,
  deletePlaylist,
  addSong,
  deleteSong,
} from "../../store/slices/playlistSlice";

// Componentes de Layout e Funcionalidades
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SongSearch from "../../components/SongSearch";

// Tipos e Ícones
import { type Track } from "../../services/apiService";
import {
  PlusCircle,
  Search,
  ArrowLeft,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";

// Define os possíveis modos de visualização do Dashboard para controle da UI
type ViewMode = "playlists" | "create" | "search";

const Dashboard = () => {
  // --- HOOKS E ESTADO INICIAL ---
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Seletor para buscar dados do estado global do Redux
  const { playlists } = useSelector((state: RootState) => state.playlists);
  const { user, lastLogin } = useSelector((state: RootState) => state.auth);

  // Estado para controlar a visualização da UI (o que é mostrado na tela)
  const [activeView, setActiveView] = useState<ViewMode>("playlists");

  // Estado para o formulário de criação de nova playlist
  const [newPlaylistName, setNewPlaylistName] = useState("");

  // Estados para controlar a edição inline do nome da playlist
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(
    null
  );
  const [editedPlaylistName, setEditedPlaylistName] = useState("");

  // Estados para controlar o modal de adição de música
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songToAdd, setSongToAdd] = useState<Track | null>(null);

  // Otimiza a filtragem de playlists para evitar recálculos desnecessários
  const userPlaylists = useMemo(
    () => (user ? playlists.filter((p) => p.usuarioId === user.id) : []),
    [playlists, user]
  );

  // Manipulador para criar uma nova playlist
  const handleAddPlaylist = () => {
    if (!newPlaylistName.trim() || !user?.id) return;
    dispatch(addPlaylist({ name: newPlaylistName.trim(), usuarioId: user.id }));
    setNewPlaylistName("");
    setActiveView("playlists");
  };

  // Manipulador para salvar o nome editado da playlist
  const handleSaveEditPlaylist = () => {
    if (!editedPlaylistName.trim() || !editingPlaylistId || !user?.id) return;
    dispatch(
      editPlaylist({
        id: editingPlaylistId,
        name: editedPlaylistName.trim(),
        usuarioId: user.id,
      })
    );
    setEditingPlaylistId(null);
    setEditedPlaylistName("");
  };

  // Abre o modal com os dados da música selecionada na busca da API
  const handleOpenAddSongModal = (track: Track) => {
    setSongToAdd(track);
    setIsModalOpen(true);
  };

  // Confirma a adição da música do modal para uma playlist específica
  const handleConfirmAddSong = (playlistId: string) => {
    if (!songToAdd || !user?.id) return;

    // Mapeia os dados da API (Track) para o formato esperado pelo reducer (Song)
    const newSongPayload = {
      playlistId,
      usuarioId: user.id,
      title: songToAdd.strTrack,
      artist: songToAdd.strArtist,
      genero: songToAdd.strGenre || "Desconhecido",
      ano: parseInt(songToAdd.intYearReleased) || new Date().getFullYear(),
    };

    dispatch(addSong(newSongPayload));
    setIsModalOpen(false);
    setSongToAdd(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
      <Header />

      <main className="flex-grow pt-24 px-4 sm:px-6 pb-10 max-w-7xl mx-auto w-full">
        {/* Cabeçalho da página com informações do usuário */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Bem-vindo de Volta!
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {user?.email} • Último acesso:{" "}
              {lastLogin && new Date(lastLogin).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        {/* Cards de Ação para navegação principal da página */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div
            onClick={() => setActiveView("create")}
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg flex items-center gap-4 transition cursor-pointer"
          >
            <PlusCircle size={40} className="text-slasherRed flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold">Criar Nova Playlist</h3>
              <p className="text-sm text-gray-400">
                Comece uma nova coleção de músicas.
              </p>
            </div>
          </div>
          <div
            onClick={() => setActiveView("search")}
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg flex items-center gap-4 transition cursor-pointer"
          >
            <Search size={40} className="text-slasherRed flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold">Buscar Músicas na API</h3>
              <p className="text-sm text-gray-400">
                Encontre e adicione novas músicas.
              </p>
            </div>
          </div>
        </div>

        {/* Área de Conteúdo Dinâmico: renderiza uma view por vez */}
        <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg">
          {/* View: Formulário de Criação de Playlist */}
          {activeView === "create" && (
            <div>
              <button
                onClick={() => setActiveView("playlists")}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition"
              >
                <ArrowLeft size={16} /> Voltar para Playlists
              </button>
              <h2 className="text-2xl font-bold mb-4">Criar Nova Playlist</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Nome da nova playlist"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
                />
                <button
                  onClick={handleAddPlaylist}
                  className="px-5 py-3 bg-slasherRed hover:bg-red-700 rounded-lg font-semibold transition cursor-pointer"
                >
                  Criar
                </button>
              </div>
            </div>
          )}

          {/* View: Busca de Músicas */}
          {activeView === "search" && (
            <div>
              <button
                onClick={() => setActiveView("playlists")}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition"
              >
                <ArrowLeft size={16} /> Voltar para Playlists
              </button>
              <SongSearch onAddSong={handleOpenAddSongModal} />
            </div>
          )}

          {/* View: Exibição das Playlists do Usuário (Padrão) */}
          {activeView === "playlists" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Suas Playlists</h2>
              {userPlaylists.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  Você ainda não criou nenhuma playlist. 😔
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPlaylists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="bg-gray-900/80 p-5 rounded-xl shadow-lg border border-gray-800 flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-4">
                        {editingPlaylistId === playlist.id ? (
                          <div className="flex gap-2 w-full">
                            <input
                              type="text"
                              value={editedPlaylistName}
                              onChange={(e) =>
                                setEditedPlaylistName(e.target.value)
                              }
                              className="flex-1 px-3 py-1 rounded bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-slasherRed"
                            />
                            <button
                              onClick={handleSaveEditPlaylist}
                              className="text-green-400 hover:text-green-300"
                            >
                              <Check size={20} />
                            </button>
                            <button
                              onClick={() => setEditingPlaylistId(null)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <h3
                              className="text-xl font-semibold truncate"
                              title={playlist.name}
                            >
                              {playlist.name}
                            </h3>
                            <div className="flex gap-3 flex-shrink-0 ml-2">
                              <button
                                onClick={() => {
                                  setEditingPlaylistId(playlist.id);
                                  setEditedPlaylistName(playlist.name);
                                }}
                                className="text-yellow-400 hover:text-yellow-300"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() =>
                                  dispatch(
                                    deletePlaylist({
                                      id: playlist.id,
                                      usuarioId: user.id,
                                    })
                                  )
                                }
                                className="text-red-500 hover:text-red-400"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="space-y-3 mt-2 flex-grow">
                        {playlist.songs.map((song) => (
                          <div
                            key={song.id}
                            className="bg-gray-800/60 px-4 py-2 rounded-lg flex justify-between items-center"
                          >
                            <div>
                              <span className="font-medium text-sm">
                                {song.title}
                              </span>
                              <p className="text-gray-400 text-xs">
                                — {song.artist}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                dispatch(
                                  deleteSong({
                                    playlistId: playlist.id,
                                    songId: song.id,
                                    usuarioId: user.id,
                                  })
                                )
                              }
                              className="text-red-500 hover:text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        {playlist.songs.length === 0 && (
                          <p className="text-gray-600 text-sm text-center py-4">
                            Nenhuma música adicionada.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal para adicionar música, renderizado apenas quando necessário */}
      {isModalOpen && songToAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
            <h3 className="text-lg font-bold mb-2">Adicionar à Playlist</h3>
            <p className="text-sm text-gray-300 mb-4">
              Adicionar "
              <span className="font-semibold text-white">
                {songToAdd.strTrack}
              </span>
              " por{" "}
              <span className="font-semibold text-white">
                {songToAdd.strArtist}
              </span>{" "}
              em:
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {userPlaylists.length > 0 ? (
                userPlaylists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => handleConfirmAddSong(playlist.id)}
                    className="w-full text-left bg-gray-700 hover:bg-slasherRed px-4 py-3 rounded-md transition"
                  >
                    {playlist.name}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Crie uma playlist primeiro.
                </p>
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-gray-600 hover:bg-gray-500 py-2 rounded-md transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
