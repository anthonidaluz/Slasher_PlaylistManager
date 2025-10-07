import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  addPlaylist,
  editPlaylist,
  deletePlaylist,
  addSong,
  deleteSong,
} from "../../store/slices/playlistSlice";
import { logout } from "../../store/slices/authSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const lastLogin = useSelector((state: RootState) => state.auth.lastLogin);

  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [newSongGenero, setNewSongGenero] = useState("");
  const [newSongAno, setNewSongAno] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);

  const handleAddPlaylist = () => {
    if (!newName.trim() || !user?.id) return;
    dispatch(addPlaylist({ name: newName.trim(), usuarioId: user.id }));
    setNewName("");
  };

  const handleEditPlaylist = () => {
    if (!editedName.trim() || !editingId || !user?.id) return;
    dispatch(
      editPlaylist({
        id: editingId,
        name: editedName.trim(),
        usuarioId: user.id,
      })
    );
    setEditingId(null);
    setEditedName("");
  };

  const handleAddSong = (playlistId: string) => {
    if (
      !newSongTitle.trim() ||
      !newSongArtist.trim() ||
      !newSongGenero.trim() ||
      !newSongAno.trim() ||
      !user?.id
    )
      return;

    dispatch(
      addSong({
        playlistId,
        usuarioId: user.id,
        title: newSongTitle,
        artist: newSongArtist,
        genero: newSongGenero,
        ano: parseInt(newSongAno),
      })
    );

    setNewSongTitle("");
    setNewSongArtist("");
    setNewSongGenero("");
    setNewSongAno("");
    setActivePlaylistId(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userPlaylists = playlists.filter((p) => p.usuarioId === user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
      {/* Header fixo */}
      <Header />

      {/* Conteúdo */}
      <main className="pt-24 px-6 pb-10 max-w-7xl mx-auto">
        {/* Cabeçalho interno */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-white">
              🎵 Suas Playlists
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {user?.email} • Último acesso:{" "}
              {lastLogin && new Date(lastLogin).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        {/* Criar playlist */}
        <div className="flex gap-3 mb-10">
          <input
            type="text"
            placeholder="Nova playlist"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
          />
          <button
            onClick={handleAddPlaylist}
            className="px-5 py-3 bg-slasherRed hover:bg-red-700 rounded-lg font-semibold transition cursor-pointer"
          >
            Criar
          </button>
        </div>

        {/* Grid de playlists */}
        {userPlaylists.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Nenhuma playlist criada ainda 😔
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-800 hover:shadow-[0_0_20px_rgba(139,0,0,0.3)] transition"
              >
                <div className="flex justify-between items-center mb-4">
                  {editingId === playlist.id ? (
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="flex-1 px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-slasherRed"
                      />
                      <button
                        onClick={handleEditPlaylist}
                        className="text-green-400 hover:text-green-300 font-medium cursor-pointer"
                      >
                        Salvar
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold">{playlist.name}</h2>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditingId(playlist.id);
                            setEditedName(playlist.name);
                          }}
                          className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
                        >
                          Editar
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
                          className="text-red-500 hover:text-red-400 cursor-pointer"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Músicas */}
                <div className="space-y-3">
                  {playlist.songs.map((song) => (
                    <div
                      key={song.id}
                      className="bg-gray-800/60 px-4 py-3 rounded-lg flex justify-between items-center transition hover:bg-gray-800"
                    >
                      <div>
                        <span className="font-medium">{song.title}</span>{" "}
                        <span className="text-gray-400 text-sm">
                          — {song.artist}
                        </span>
                        <div className="text-xs text-gray-500">
                          {song.genero} • {song.ano}
                        </div>
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
                        className="text-red-400 hover:text-red-300 text-sm font-medium cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  ))}

                  {/* Adicionar música */}
                  <div className="mt-4 space-y-2">
                    <input
                      type="text"
                      placeholder="Nome da música"
                      value={
                        activePlaylistId === playlist.id ? newSongTitle : ""
                      }
                      onChange={(e) => {
                        setActivePlaylistId(playlist.id);
                        setNewSongTitle(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
                    />
                    <input
                      type="text"
                      placeholder="Artista"
                      value={
                        activePlaylistId === playlist.id ? newSongArtist : ""
                      }
                      onChange={(e) => {
                        setActivePlaylistId(playlist.id);
                        setNewSongArtist(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
                    />
                    <input
                      type="text"
                      placeholder="Gênero"
                      value={
                        activePlaylistId === playlist.id ? newSongGenero : ""
                      }
                      onChange={(e) => {
                        setActivePlaylistId(playlist.id);
                        setNewSongGenero(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
                    />
                    <input
                      type="number"
                      placeholder="Ano"
                      value={activePlaylistId === playlist.id ? newSongAno : ""}
                      onChange={(e) => {
                        setActivePlaylistId(playlist.id);
                        setNewSongAno(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
                    />
                    <button
                      onClick={() => handleAddSong(playlist.id)}
                      className="w-full bg-slasherRed hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
                    >
                      Adicionar música
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
