// categoryList.constants.ts - Constantes para CategoryList
export const DEFAULT_CATEGORIES = [
    { id: 28, name: "Ação" },
    { id: 35, name: "Comédia" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Terror" },
    { id: 878, name: "Ficção Científica" },
    { id: 10749, name: "Romance" },
] as const;

export const LOADING_MESSAGE = "Carregando categorias...";
export const ERROR_MESSAGE = "Erro ao carregar categorias.";

export const TEST_IDS = {
    CATEGORIES_GRID: "categories-grid",
    CATEGORY_CARD: "category-card",
} as const;
