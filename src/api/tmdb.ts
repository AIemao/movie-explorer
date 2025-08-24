import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

// Debug logs para verificar se as variáveis estão sendo carregadas
console.log('API_KEY:', API_KEY ? 'Carregada' : 'Não encontrada');
console.log('BASE_URL:', BASE_URL);
console.log('IMAGE_BASE_URL:', IMAGE_BASE_URL);

// Configuração base do axios
const tmdbApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
    },
    params: {
        language: 'pt-BR',
    },
});

// Tipos para as respostas da API
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenresResponse {
    genres: Genre[];
}

export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime: number;
    production_companies: Array<{
        id: number;
        name: string;
        logo_path: string | null;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
}

// Funções da API
export const tmdbService = {
    // Obter filmes em cartaz
    getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
        try {
            console.log('Fazendo requisição para:', `${BASE_URL}/movie/now_playing`);
            const response = await tmdbApi.get('/movie/now_playing', {
                params: {
                    region: 'BR',
                    page,
                },
            });
            console.log('Resposta da API:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro na API getNowPlayingMovies:', error);
            throw error;
        }
    },

    // Obter detalhes de um filme
    getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
        const response = await tmdbApi.get(`/movie/${movieId}`);
        return response.data;
    },

    // Obter lista de gêneros
    getGenres: async (): Promise<GenresResponse> => {
        const response = await tmdbApi.get('/genre/movie/list');
        return response.data;
    },

    // Descobrir filmes por gênero
    getMoviesByGenre: async (genreId: number, page: number = 1): Promise<MoviesResponse> => {
        const response = await tmdbApi.get('/discover/movie', {
            params: {
                with_genres: genreId,
                page,
                region: 'BR',
            },
        });
        return response.data;
    },
};
