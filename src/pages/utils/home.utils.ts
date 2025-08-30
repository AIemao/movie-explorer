// home.utils.ts - Funções auxiliares para Home
import type { MoviesResponse } from "../../api/tmdb";

export function shouldLoadMore(movies: MoviesResponse | null, currentPage: number): boolean {
    return movies ? currentPage < movies.total_pages : false;
}

export function handleApiError(error: unknown): string {
    console.error("Erro ao carregar filmes:", error);
    return "Erro ao carregar filmes. Verifique sua conexão e tente novamente.";
}

export function getLoadMoreButtonText(loadingMore: boolean): string {
    return loadingMore ? "Carregando..." : "Carregar Mais";
}
