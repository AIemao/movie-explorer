// genrePage.utils.ts - Funções auxiliares para GenrePage
import type { MoviesResponse } from "../../api/tmdb";

export function shouldLoadMore(movies: MoviesResponse | null, currentPage: number): boolean {
    return movies ? currentPage < movies.total_pages : false;
}

export function handleApiError(error: unknown): string {
    console.error("Erro ao carregar filmes por gênero:", error);
    return "Erro ao carregar filmes. Verifique sua conexão e tente novamente.";
}

export function getLoadMoreButtonText(loadingMore: boolean): string {
    return loadingMore ? "Carregando..." : "Carregar Mais";
}

export function getLoadingMessage(genreName?: string): string {
    return genreName ? `🎭 Descobrindo filmes de ${genreName}...` : "🎬 Descobrindo filmes...";
}

export function getEmptyStateMessage(genreName?: string): string {
    return genreName
        ? `🎪 Ops! Não encontramos filmes para o gênero ${genreName}.`
        : "🎪 Nenhum filme encontrado.";
}

export function getPageTitle(genreName?: string): string {
    return genreName ? `Filmes de ${genreName}` : "Filmes por Gênero";
}
