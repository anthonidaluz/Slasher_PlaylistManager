import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store";
import {
  fetchSongsByArtist,
  clearSearchResults,
} from "../../store/slices/searchSlice";
import { type Track } from "../../services/apiService";

// O componente agora recebe uma prop 'onAddSong' que é uma função
const SongSearch = ({ onAddSong }: { onAddSong: (track: Track) => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Estado local para controlar o valor do input de busca
  const [query, setQuery] = useState("");

  // Pega os dados do slice 'search' do Redux
  const { results, status, error } = useSelector(
    (state: RootState) => state.search
  );

  // Efeito para fazer a busca com "debounce"
  useEffect(() => {
    // Se o campo de busca estiver vazio, limpa os resultados e não faz nada
    if (query.trim() === "") {
      dispatch(clearSearchResults());
      return;
    }

    // Cria um temporizador para esperar 500ms antes de buscar
    const timer = setTimeout(() => {
      dispatch(fetchSongsByArtist(query));
    }, 500); // Meio segundo de espera

    // Função de limpeza: se o usuário digitar novamente, o temporizador anterior é cancelado
    return () => {
      clearTimeout(timer);
    };
  }, [query, dispatch]); // Este efeito roda sempre que 'query' ou 'dispatch' mudam

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Buscar Músicas na API
      </h2>
      <input
        type="text"
        placeholder="Digite o nome de um artista..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slasherRed"
      />

      {/* Exibição dos resultados */}
      <div className="mt-6">
        {status === "loading" && <p className="text-gray-400">Buscando...</p>}
        {status === "failed" && <p className="text-red-500">Erro: {error}</p>}
        {status === "succeeded" &&
          results.length === 0 &&
          query.trim() !== "" && (
            <p className="text-gray-500">
              Nenhum resultado encontrado para "{query}".
            </p>
          )}

        {/* Lista de resultados */}
        <div className="space-y-3">
          {results.map((track) => (
            <div
              key={track.idTrack}
              className="bg-gray-800/60 p-4 rounded-lg flex justify-between items-center transition hover:bg-gray-800"
            >
              <div>
                <span className="font-medium">{track.strTrack}</span>
                <span className="text-gray-400 text-sm">
                  {" "}
                  — {track.strArtist}
                </span>
                <div className="text-xs text-gray-500">
                  Álbum: {track.strAlbum || "N/A"} • Ano:{" "}
                  {track.intYearReleased || "N/A"}
                </div>
              </div>
              <button
                // Ao clicar, chama a função 'onAddSong' recebida do Dashboard, passando os dados da música
                onClick={() => onAddSong(track)}
                className="bg-slasherRed hover:bg-red-700 text-white text-sm font-semibold px-3 py-1.5 rounded-md transition whitespace-nowrap"
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongSearch;
