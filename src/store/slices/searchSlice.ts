import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { type Track, searchTracksByArtist } from "../../services/apiService"; // Importe a função e o tipo do nosso serviço

// Define o formato do nosso estado para este slice
interface SearchState {
  results: Track[];
  status: "idle" | "loading" | "succeeded" | "failed"; // Controla o status da busca
  error: string | null;
}

// O estado inicial quando a aplicação carrega
const initialState: SearchState = {
  results: [],
  status: "idle", // 'idle' significa que nada está acontecendo
  error: null,
};

// Ação assíncrona (Thunk) para buscar músicas
// Isso permite lidar com a lógica de API fora dos componentes
export const fetchSongsByArtist = createAsyncThunk(
  "search/fetchByArtist",
  async (artistName: string, { rejectWithValue }) => {
    // Não faz a busca se o nome do artista estiver vazio
    if (!artistName.trim()) {
      return []; // Retorna um array vazio para limpar os resultados
    }
    try {
      const tracks = await searchTracksByArtist(artistName);
      return tracks;
    } catch (error) {
      // Se a chamada falhar, rejeitamos a promessa com uma mensagem de erro
      return rejectWithValue("Não foi possível buscar as músicas.");
    }
  }
);

// Criação do slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  // Reducers síncronos (para ações que não envolvem API)
  reducers: {
    // Ação para limpar os resultados da busca manualmente
    clearSearchResults(state) {
      state.results = [];
      state.status = "idle";
    },
  },
  // Reducers assíncronos (para lidar com o nosso createAsyncThunk)
  extraReducers: (builder) => {
    builder
      // Quando a busca está começando (carregando)
      .addCase(fetchSongsByArtist.pending, (state) => {
        state.status = "loading";
      })
      // Quando a busca terminou com sucesso
      .addCase(
        fetchSongsByArtist.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          state.status = "succeeded";
          state.results = action.payload; // Atualiza os resultados com os dados da API
        }
      )
      // Quando a busca falhou
      .addCase(fetchSongsByArtist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string; // Salva a mensagem de erro
      });
  },
});

// Exportamos a ação síncrona e o reducer
export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
