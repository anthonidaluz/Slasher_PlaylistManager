export interface Track {
  idTrack: string;
  strTrack: string;
  strArtist: string;
  strAlbum: string;
  strGenre: string;
  intYearReleased: string;
}

// URL base da API
const API_BASE_URL = "https://www.theaudiodb.com/api/v1/json/2";

export const getTopTenTracks = async (): Promise<Track[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/mostloved.php?format=track`);
    if (!response.ok) {
      throw new Error("Falha ao buscar dados da API");
    }
    const data = await response.json();

    return data.loved || [];
  } catch (error) {
    console.error("Erro ao buscar músicas populares:", error);
    // Em caso de erro, retonar um array vazio para não quebrar a aplicação.
    return [];
  }
};

export const searchTracksByArtist = async (
  artist: string
): Promise<Track[]> => {
  const encodedArtist = encodeURIComponent(artist);

  try {
    const response = await fetch(
      `${API_BASE_URL}/track-top10.php?s=${encodedArtist}`
    );

    if (!response.ok) {
      throw new Error("Falha ao buscar dados da API");
    }
    const data = await response.json();

    return data.track || [];
  } catch (error) {
    console.error(`Erro ao buscar músicas de ${artist}:`, error);
    return [];
  }
};
