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
import { dashboardStyles as s } from "./styles";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists
  );
  const email = useSelector((state: RootState) => state.auth.user);
  const lastLogin = useSelector((state: RootState) => state.auth.lastLogin);

  // Local states for inputs
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);

  const handleAddPlaylist = () => {
    if (!newName.trim()) return;
    dispatch(addPlaylist(newName.trim()));
    setNewName("");
  };

  const handleEditPlaylist = () => {
    if (!editedName.trim() || !editingId) return;
    dispatch(editPlaylist({ id: editingId, name: editedName.trim() }));
    setEditingId(null);
    setEditedName("");
  };

  const handleAddSong = (playlistId: string) => {
    if (!newSongTitle.trim() || !newSongArtist.trim()) return;
    dispatch(
      addSong({ playlistId, title: newSongTitle, artist: newSongArtist })
    );
    setNewSongTitle("");
    setNewSongArtist("");
    setActivePlaylistId(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={s.container}>
      <h1 className={s.header}>Suas Playlists</h1>
      <p className={s.subheader}>
        Usuário logado: <span className="text-white">{email}</span>
        <br />
        Último acesso:{" "}
        {lastLogin && new Date(lastLogin).toLocaleString("pt-BR")}
      </p>

      {/* Criar playlist */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Nova playlist"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className={s.input}
        />
        <button onClick={handleAddPlaylist} className={s.buttonPrimary}>
          Criar
        </button>
      </div>

      {/* Grid de playlists */}
      <div className={s.playlistGrid}>
        {playlists.map((playlist) => (
          <div key={playlist.id} className={s.card}>
            <div className="flex justify-between items-center mb-3">
              {editingId === playlist.id ? (
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={s.input}
                  />
                  <button
                    onClick={handleEditPlaylist}
                    className="text-green-400"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <>
                  <h2 className={s.cardTitle}>{playlist.name}</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(playlist.id);
                        setEditedName(playlist.name);
                      }}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => dispatch(deletePlaylist(playlist.id))}
                      className="text-red-500 hover:text-red-400"
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Músicas */}
            <div className="space-y-2">
              {playlist.songs.map((song) => (
                <div key={song.id} className={s.songItem}>
                  <span>
                    {song.title} —{" "}
                    <span className="text-gray-400">{song.artist}</span>
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        deleteSong({ playlistId: playlist.id, songId: song.id })
                      )
                    }
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remover
                  </button>
                </div>
              ))}

              {/* Adicionar música */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Nome da música"
                  value={activePlaylistId === playlist.id ? newSongTitle : ""}
                  onChange={(e) => {
                    setActivePlaylistId(playlist.id);
                    setNewSongTitle(e.target.value);
                  }}
                  className={s.input}
                />
                <input
                  type="text"
                  placeholder="Artista"
                  value={activePlaylistId === playlist.id ? newSongArtist : ""}
                  onChange={(e) => {
                    setActivePlaylistId(playlist.id);
                    setNewSongArtist(e.target.value);
                  }}
                  className={s.input}
                />
                <button
                  onClick={() => handleAddSong(playlist.id)}
                  className={s.buttonPrimary}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className={s.logoutWrapper}>
        <button onClick={handleLogout} className={s.logoutButton}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
