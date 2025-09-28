// movieDetails.utils.ts - Funções auxiliares para MovieDetails
export function formatRuntime(runtime: number): string {
    if (!runtime) return 'Duração não disponível';

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}min`;
}

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatReleaseDate(dateString: string): string {
    if (!dateString) return 'Data não disponível';

    try {
        // parseISO é mais robusto que new Date() para strings ISO
        const date = parseISO(dateString);

        // Verifica se a data é válida
        if (isNaN(date.getTime())) {
            console.warn(`Invalid date string: ${dateString}`);
            return 'Data inválida';
        }

        // Formata usando date-fns com locale brasileiro
        return format(date, "d 'de' MMMM 'de' yyyy", {
            locale: ptBR,
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Data inválida';
    }
}

export function formatRating(rating: number): string {
    return rating.toFixed(1);
}

export function formatBudget(budget: number): string {
    if (!budget) return 'Não informado';

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(budget);
}

export function handleMovieDetailsError(error: unknown): string {
    console.error("Erro ao carregar detalhes do filme:", error);
    return "Erro ao carregar detalhes do filme. Tente novamente.";
}

export function generateGenreSlug(genreName: string): string {
    return genreName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}
