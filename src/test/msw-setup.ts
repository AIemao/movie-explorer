import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { tmdbHandlers } from './mocks/tmdb-handlers';

// Criar servidor MSW com handlers padrão
export const server = setupServer(...tmdbHandlers);

// Setup global do MSW para todos os testes
beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'warn' // Avisar sobre requisições não mockadas
    });
});

afterEach(() => {
    server.resetHandlers(); // Reset handlers após cada teste
});

afterAll(() => {
    server.close(); // Fechar servidor após todos os testes
});
