// movieDetails.utils.ts - Funções auxiliares para MovieDetails
export function formatRuntime(runtime: number): string {
    if (!runtime) return 'Duração não disponível';

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;

    return `${hours}h ${minutes}min`;
}

export function formatReleaseDate(dateString: string): string {
    if (!dateString) return 'Data não disponível';

    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
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
