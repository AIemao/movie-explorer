// movieDetails.constants.ts - Constantes para MovieDetails
export const LOADING_MESSAGE = "Carregando detalhes do filme...";
export const ERROR_MESSAGE = "Erro ao carregar filme.";
export const MOVIE_NOT_FOUND = "Filme não encontrado.";
export const BACK_BUTTON_TEXT = "← Voltar";

export const LABELS = {
    RELEASE_DATE: "Lançamento",
    DURATION: "Duração",
    RATING: "Avaliação",
    BUDGET: "Orçamento",
    GENRES: "Gêneros",
    OVERVIEW: "Sinopse",
} as const;

export const PLACEHOLDER_TEXTS = {
    NO_OVERVIEW: "Sinopse não disponível.",
    NO_BUDGET: "Não informado",
    NO_RUNTIME: "Duração não disponível",
    NO_DATE: "Data não disponível",
} as const;

export const TEST_IDS = {
    MOVIE_DETAILS: "movie-details",
    GENRE_TAG: "genre-tag",
    BACK_BUTTON: "back-button",
} as const;
