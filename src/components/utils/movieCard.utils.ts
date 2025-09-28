// movieCard.utils.ts - Funções auxiliares para MovieCard
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
        }        // Formata usando date-fns com locale brasileiro (formato curto para MovieCard)
        return format(date, "dd 'de' MMM. 'de' yyyy", {
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

export function generateMovieSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

export function buildPosterUrl(posterPath: string | null, baseUrl: string): string | null {
    if (!posterPath) return null;
    return `${baseUrl}${posterPath}`;
}
