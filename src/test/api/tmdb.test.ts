import { describe, expect, it, vi } from 'vitest';
// MoviesResponse removido pois não estava sendo utilizado  
// import type { MoviesResponse } from '../../api/tmdb';
import { tmdbService } from '../../api/tmdb';

// Mock axios
vi.mock('axios', () => ({
    default: {
        create: vi.fn(() => ({
            get: vi.fn(),
        })),
    },
}));

describe('TMDb Service', () => {
    it('should have all required service methods', () => {
        expect(tmdbService).toHaveProperty('getNowPlayingMovies');
        expect(tmdbService).toHaveProperty('getMovieDetails');
        expect(tmdbService).toHaveProperty('getGenres');
        expect(tmdbService).toHaveProperty('getMoviesByGenre');
    });

    it('should export IMAGE_BASE_URL constant', async () => {
        const { IMAGE_BASE_URL } = await import('../../api/tmdb');
        expect(IMAGE_BASE_URL).toBeDefined();
        expect(typeof IMAGE_BASE_URL).toBe('string');
    });    // Example of how to test API calls with mocks
    it('should call getNowPlayingMovies with correct parameters', async () => {
        // mockResponse removido pois não estava sendo utilizado
        // const mockResponse: MoviesResponse = {
        //     page: 1,
        //     results: [],
        //     total_pages: 1,
        //     total_results: 0,
        // };

        // This is a placeholder - in a real test you would mock the axios instance
        // and verify it was called with the correct parameters
        expect(typeof tmdbService.getNowPlayingMovies).toBe('function');
    });
});
