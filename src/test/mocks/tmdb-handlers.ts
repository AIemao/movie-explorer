import { http, HttpResponse } from 'msw';

// Mock dados para respostas
export const mockMovie = {
    id: 123,
    title: 'Filme de Teste MSW',
    overview: 'Descrição do filme de teste usando MSW',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5,
    genre_ids: [28, 12],
};

export const mockMoviesResponse = {
    page: 1,
    results: [mockMovie],
    total_pages: 10,
    total_results: 200,
};

export const mockGenresResponse = {
    genres: [
        { id: 28, name: 'Ação' },
        { id: 12, name: 'Aventura' },
        { id: 35, name: 'Comédia' },
    ],
};

export const mockMovieDetails = {
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

// Handlers para interceptar requisições TMDb
export const tmdbHandlers = [
    // GET /movie/now_playing
    http.get('https://api.themoviedb.org/3/movie/now_playing', ({ request }) => {
        const url = new URL(request.url);
        const page = url.searchParams.get('page') || '1';

        return HttpResponse.json({
            ...mockMoviesResponse,
            page: parseInt(page),
        });
    }),

    // GET /movie/:id (detalhes do filme)
    http.get('https://api.themoviedb.org/3/movie/:movieId', ({ params }) => {
        const { movieId } = params;

        // Simular erro para ID inválido
        if (movieId === '999999') {
            return HttpResponse.json(
                { status_message: 'The resource you requested could not be found.' },
                { status: 404 }
            );
        }

        return HttpResponse.json({
            ...mockMovieDetails,
            id: parseInt(movieId as string),
        });
    }),

    // GET /genre/movie/list
    http.get('https://api.themoviedb.org/3/genre/movie/list', () => {
        return HttpResponse.json(mockGenresResponse);
    }),

    // GET /discover/movie (filmes por gênero)
    http.get('https://api.themoviedb.org/3/discover/movie', ({ request }) => {
        const url = new URL(request.url);
        const genreId = url.searchParams.get('with_genres');
        const page = url.searchParams.get('page') || '1';

        // Simular resposta vazia para gênero inválido
        if (genreId === '99999') {
            return HttpResponse.json({
                ...mockMoviesResponse,
                results: [],
                total_results: 0,
            });
        }

        return HttpResponse.json({
            ...mockMoviesResponse,
            page: parseInt(page),
        });
    }),
];

// Handlers para cenários de erro
export const errorHandlers = [
    // Erro de rede
    http.get('https://api.themoviedb.org/3/movie/now_playing', () => {
        return HttpResponse.error();
    }),

    // Erro de autenticação
    http.get('https://api.themoviedb.org/3/genre/movie/list', () => {
        return HttpResponse.json(
            { status_message: 'Invalid API key' },
            { status: 401 }
        );
    }),

    // Timeout
    http.get('https://api.themoviedb.org/3/discover/movie', () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(HttpResponse.error()), 5000);
        });
    }),
];
