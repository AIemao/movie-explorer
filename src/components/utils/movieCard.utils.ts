// movieCard.utils.ts - Funções auxiliares para MovieCard
export function formatReleaseDate(dateString: string): string {
    if (!dateString) return 'Data não disponível';

    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
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
