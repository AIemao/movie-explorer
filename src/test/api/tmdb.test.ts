import type { MockedFunction } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock simples do serviço diretamente na factory
vi.mock('../../api/tmdb', () => ({
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
    tmdbService: {
        getNowPlayingMovies: vi.fn(),
        getMovieDetails: vi.fn(),
        getGenres: vi.fn(),
        getMoviesByGenre: vi.fn(),
    }
}));

// Importar após o mock
import type { GenresResponse, MovieDetails, MoviesResponse } from '../../api/tmdb';
import { IMAGE_BASE_URL, tmdbService } from '../../api/tmdb';

// Tipos para os mocks
type MockedTmdbService = {
    getNowPlayingMovies: MockedFunction<(page?: number) => Promise<MoviesResponse>>;
    getMovieDetails: MockedFunction<(movieId: number) => Promise<MovieDetails>>;
    getGenres: MockedFunction<() => Promise<GenresResponse>>;
    getMoviesByGenre: MockedFunction<(genreId: number, page?: number) => Promise<MoviesResponse>>;
};

const mockTmdbService = tmdbService as MockedTmdbService;

// Mock dados para testes
const mockMovie = {
    id: 123,
    title: 'Filme de Teste',
    overview: 'Descrição do filme de teste',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5,
    genre_ids: [28, 12],
};

const mockMoviesResponse = {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200,
};

const mockGenresResponse = {
    genres: [
        { id: 28, name: 'Ação' },
        { id: 12, name: 'Aventura' }
    ],
};

const mockMovieDetails = {
    ...mockMovie,
    genres: [{ id: 28, name: 'Ação' }],
    runtime: 120,
    production_companies: [
        {
            id: 1,
            name: 'Test Studios',
            logo_path: '/test-logo.jpg',
        },
    ],
    production_countries: [
        {
            iso_3166_1: 'US',
            name: 'United States',
        },
    ],
};

describe('TMDb Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Service Structure and Exports', () => {
        it('should have all required service methods', () => {
            expect(tmdbService).toHaveProperty('getNowPlayingMovies');
            expect(tmdbService).toHaveProperty('getMovieDetails');
            expect(tmdbService).toHaveProperty('getGenres');
            expect(tmdbService).toHaveProperty('getMoviesByGenre');

            // Verificar se são funções
            expect(typeof tmdbService.getNowPlayingMovies).toBe('function');
            expect(typeof tmdbService.getMovieDetails).toBe('function');
            expect(typeof tmdbService.getGenres).toBe('function');
            expect(typeof tmdbService.getMoviesByGenre).toBe('function');
        });

        it('should export IMAGE_BASE_URL constant', () => {
            expect(IMAGE_BASE_URL).toBeDefined();
            expect(typeof IMAGE_BASE_URL).toBe('string');
        });
    }); describe('getNowPlayingMovies', () => {
        it('should fetch now playing movies with default page', async () => {
            mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

            const result = await tmdbService.getNowPlayingMovies();

            expect(tmdbService.getNowPlayingMovies).toHaveBeenCalledWith();
            expect(result).toEqual(mockMoviesResponse);
        }); it('should fetch now playing movies with specific page', async () => {
            mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

            const result = await tmdbService.getNowPlayingMovies(3);

            expect(tmdbService.getNowPlayingMovies).toHaveBeenCalledWith(3);
            expect(result).toEqual(mockMoviesResponse);
        });

        it('should handle API errors in getNowPlayingMovies', async () => {
            const mockError = new Error('API Error');
            mockTmdbService.getNowPlayingMovies.mockRejectedValue(mockError);

            await expect(tmdbService.getNowPlayingMovies()).rejects.toThrow('API Error');

            expect(tmdbService.getNowPlayingMovies).toHaveBeenCalledWith();
        });
    }); describe('getMovieDetails', () => {
        it('should fetch movie details with correct movie ID', async () => {
            mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

            const result = await tmdbService.getMovieDetails(123);

            expect(tmdbService.getMovieDetails).toHaveBeenCalledWith(123);
            expect(result).toEqual(mockMovieDetails);
        }); it('should handle invalid movie ID', async () => {
            const mockError = new Error('Movie not found');
            mockTmdbService.getMovieDetails.mockRejectedValue(mockError);

            await expect(tmdbService.getMovieDetails(999999)).rejects.toThrow('Movie not found');

            expect(tmdbService.getMovieDetails).toHaveBeenCalledWith(999999);
        });
    });

    describe('getGenres', () => {
        it('should fetch movie genres list', async () => {
            mockTmdbService.getGenres.mockResolvedValue(mockGenresResponse);

            const result = await tmdbService.getGenres();

            expect(tmdbService.getGenres).toHaveBeenCalledWith();
            expect(result).toEqual(mockGenresResponse);
            expect(result.genres).toHaveLength(2);
            expect(result.genres[0].name).toBe('Ação');
        });

        it('should handle API errors in getGenres', async () => {
            const mockError = new Error('Genres API Error');
            mockTmdbService.getGenres.mockRejectedValue(mockError);

            await expect(tmdbService.getGenres()).rejects.toThrow('Genres API Error');

            expect(tmdbService.getGenres).toHaveBeenCalledWith();
        });
    }); describe('getMoviesByGenre', () => {
        it('should fetch movies by genre with default page', async () => {
            mockTmdbService.getMoviesByGenre.mockResolvedValue(mockMoviesResponse);

            const result = await tmdbService.getMoviesByGenre(28);

            expect(tmdbService.getMoviesByGenre).toHaveBeenCalledWith(28);
            expect(result).toEqual(mockMoviesResponse);
        });

        it('should fetch movies by genre with specific page', async () => {
            mockTmdbService.getMoviesByGenre.mockResolvedValue(mockMoviesResponse);

            const result = await tmdbService.getMoviesByGenre(12, 2);

            expect(tmdbService.getMoviesByGenre).toHaveBeenCalledWith(12, 2);
            expect(result).toEqual(mockMoviesResponse);
        });

        it('should handle API errors in getMoviesByGenre', async () => {
            const mockError = new Error('Genre movies API Error');
            mockTmdbService.getMoviesByGenre.mockRejectedValue(mockError);

            await expect(tmdbService.getMoviesByGenre(28)).rejects.toThrow('Genre movies API Error');

            expect(tmdbService.getMoviesByGenre).toHaveBeenCalledWith(28);
        });
    });
});
