import { beforeEach, describe, expect, it } from 'vitest';
import { IMAGE_BASE_URL, tmdbService } from '../../api/tmdb';
import { errorHandlers, mockGenresResponse, mockMovie, mockMovieDetails, mockMoviesResponse } from '../mocks/tmdb-handlers';
import { server } from '../msw-setup';

describe('TMDb Service - Integration Tests (Real Code)', () => {
    beforeEach(() => {
        // Reset para handlers padrão antes de cada teste
        server.resetHandlers();
    });

    describe('Service Structure and Exports', () => {
        it('should export IMAGE_BASE_URL constant', () => {
            expect(IMAGE_BASE_URL).toBeDefined();
            expect(typeof IMAGE_BASE_URL).toBe('string');
            expect(IMAGE_BASE_URL).toContain('image.tmdb.org');
        });

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
    });

    describe('getNowPlayingMovies - Real Implementation', () => {
        it('should fetch now playing movies with default page', async () => {
            const result = await tmdbService.getNowPlayingMovies();

            expect(result).toEqual(mockMoviesResponse);
            expect(result.page).toBe(1);
            expect(result.results).toHaveLength(1);
            expect(result.results[0]).toEqual(mockMovie);
        });

        it('should fetch now playing movies with specific page', async () => {
            const result = await tmdbService.getNowPlayingMovies(3);

            expect(result.page).toBe(3);
            expect(result.results).toEqual(mockMoviesResponse.results);
        });

        it('should handle network errors in getNowPlayingMovies', async () => {
            // Usar handler de erro para simular falha de rede
            server.use(errorHandlers[0]);

            await expect(tmdbService.getNowPlayingMovies()).rejects.toThrow();
        });

        it('should pass correct parameters in API call', async () => {
            // Testando com página alta para validar parâmetros
            const result = await tmdbService.getNowPlayingMovies(999);

            expect(result.page).toBe(999);
        });
    });

    describe('getMovieDetails - Real Implementation', () => {
        it('should fetch movie details with correct movie ID', async () => {
            const result = await tmdbService.getMovieDetails(123);

            expect(result).toEqual(expect.objectContaining({
                ...mockMovieDetails,
                id: 123,
            }));
            expect(result.genres).toBeDefined();
            expect(result.runtime).toBe(120);
            expect(result.production_companies).toHaveLength(1);
        });

        it('should handle movie not found error', async () => {
            await expect(tmdbService.getMovieDetails(999999)).rejects.toThrow();
        });

        it('should return correct data structure for movie details', async () => {
            const result = await tmdbService.getMovieDetails(456);

            // Validar estrutura de dados
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('title');
            expect(result).toHaveProperty('overview');
            expect(result).toHaveProperty('genres');
            expect(result).toHaveProperty('runtime');
            expect(result).toHaveProperty('production_companies');
            expect(result).toHaveProperty('production_countries');
        });
    });

    describe('getGenres - Real Implementation', () => {
        it('should fetch movie genres list', async () => {
            const result = await tmdbService.getGenres();

            expect(result).toEqual(mockGenresResponse);
            expect(result.genres).toHaveLength(3);
            expect(result.genres[0]).toEqual({ id: 28, name: 'Ação' });
            expect(result.genres[1]).toEqual({ id: 12, name: 'Aventura' });
        });

        it('should handle authentication errors in getGenres', async () => {
            // Usar handler de erro de autenticação
            server.use(errorHandlers[1]);

            await expect(tmdbService.getGenres()).rejects.toThrow();
        });

        it('should return correct genres data structure', async () => {
            const result = await tmdbService.getGenres();

            expect(result).toHaveProperty('genres');
            expect(Array.isArray(result.genres)).toBe(true);

            result.genres.forEach(genre => {
                expect(genre).toHaveProperty('id');
                expect(genre).toHaveProperty('name');
                expect(typeof genre.id).toBe('number');
                expect(typeof genre.name).toBe('string');
            });
        });
    });

    describe('getMoviesByGenre - Real Implementation', () => {
        it('should fetch movies by genre with default page', async () => {
            const result = await tmdbService.getMoviesByGenre(28);

            expect(result).toEqual(mockMoviesResponse);
            expect(result.page).toBe(1);
            expect(result.results).toHaveLength(1);
        });

        it('should fetch movies by genre with specific page', async () => {
            const result = await tmdbService.getMoviesByGenre(12, 2);

            expect(result.page).toBe(2);
            expect(result.results).toEqual(mockMoviesResponse.results);
        });

        it('should handle invalid genre ID', async () => {
            const result = await tmdbService.getMoviesByGenre(99999);

            expect(result.results).toHaveLength(0);
            expect(result.total_results).toBe(0);
        }); it('should handle timeout errors in getMoviesByGenre', async () => {
            // Configurar timeout de teste menor
            await expect(async () => {
                // Usar handler de timeout
                server.use(errorHandlers[2]);
                await tmdbService.getMoviesByGenre(28);
            }).rejects.toThrow();
        }, 8000); // Timeout de 8 segundos para este teste específico

        it('should return correct data structure for movies by genre', async () => {
            const result = await tmdbService.getMoviesByGenre(35);

            expect(result).toHaveProperty('page');
            expect(result).toHaveProperty('results');
            expect(result).toHaveProperty('total_pages');
            expect(result).toHaveProperty('total_results');
            expect(Array.isArray(result.results)).toBe(true);
        });
    });

    describe('Error Handling and Edge Cases', () => {
        it('should handle concurrent API calls correctly', async () => {
            const [moviesResult, genresResult, detailsResult] = await Promise.all([
                tmdbService.getNowPlayingMovies(),
                tmdbService.getGenres(),
                tmdbService.getMovieDetails(123),
            ]);

            expect(moviesResult).toEqual(mockMoviesResponse);
            expect(genresResult).toEqual(mockGenresResponse);
            expect(detailsResult.id).toBe(123);
        });

        it('should maintain data consistency across multiple calls', async () => {
            const firstCall = await tmdbService.getNowPlayingMovies(1);
            const secondCall = await tmdbService.getNowPlayingMovies(1);

            expect(firstCall).toEqual(secondCall);
        });

        it('should handle different parameter combinations', async () => {
            // Teste com vários gêneros
            const actionMovies = await tmdbService.getMoviesByGenre(28, 1);
            const adventureMovies = await tmdbService.getMoviesByGenre(12, 2);

            expect(actionMovies.page).toBe(1);
            expect(adventureMovies.page).toBe(2);
        });
    });

    describe('Data Transformation and Parsing', () => {
        it('should correctly parse movie data from API response', async () => {
            const result = await tmdbService.getNowPlayingMovies();
            const movie = result.results[0];

            expect(movie.id).toBe(123);
            expect(movie.title).toBe('Filme de Teste MSW');
            expect(movie.vote_average).toBe(8.5);
            expect(movie.genre_ids).toEqual([28, 12]);
        });

        it('should correctly parse genre data from API response', async () => {
            const result = await tmdbService.getGenres();

            expect(result.genres[0].id).toBe(28);
            expect(result.genres[0].name).toBe('Ação');
        });

        it('should correctly parse movie details with extended data', async () => {
            const result = await tmdbService.getMovieDetails(123);

            expect(result.runtime).toBe(120);
            expect(result.production_companies[0].name).toBe('Test Studios');
            expect(result.production_countries[0].name).toBe('United States');
        });
    });
});
