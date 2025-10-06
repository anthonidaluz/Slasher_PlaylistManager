import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Song = { id: string; title: string; artist: string };
type Playlist = { id: string; name: string; songs: Song[] };

interface PlaylistState {
  playlists: Playlist[];
}

const initialState: PlaylistState = {
  playlists: JSON.parse(localStorage.getItem("slasherPlaylists") || "[]"),
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    addPlaylist: (state, action: PayloadAction<string>) => {
      state.playlists.push({
        id: crypto.randomUUID(),
        name: action.payload,
        songs: [],
      });
      localStorage.setItem("slasherPlaylists", JSON.stringify(state.playlists));
    },
    editPlaylist: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const playlist = state.playlists.find((p) => p.id === action.payload.id);
      if (playlist) playlist.name = action.payload.name;
      localStorage.setItem("slasherPlaylists", JSON.stringify(state.playlists));
    },
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter((p) => p.id !== action.payload);
      localStorage.setItem("slasherPlaylists", JSON.stringify(state.playlists));
    },
    addSong: (
      state,
      action: PayloadAction<{
        playlistId: string;
        title: string;
        artist: string;
      }>
    ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (playlist) {
        playlist.songs.push({
          id: crypto.randomUUID(),
          title: action.payload.title,
          artist: action.payload.artist,
        });
      }
      localStorage.setItem("slasherPlaylists", JSON.stringify(state.playlists));
    },
    deleteSong: (
      state,
      action: PayloadAction<{ playlistId: string; songId: string }>
    ) => {
      const playlist = state.playlists.find(
        (p) => p.id === action.payload.playlistId
      );
      if (playlist) {
        playlist.songs = playlist.songs.filter(
          (s) => s.id !== action.payload.songId
        );
      }
      localStorage.setItem("slasherPlaylists", JSON.stringify(state.playlists));
    },
  },
});

export const {
  addPlaylist,
  editPlaylist,
  deletePlaylist,
  addSong,
  deleteSong,
} = playlistSlice.actions;
export default playlistSlice.reducer;
