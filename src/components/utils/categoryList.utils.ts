// categoryList.utils.ts - Funções auxiliares para CategoryList
export function generateCategorySlug(categoryName: string): string {
    return categoryName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

export function buildCategoryPath(categoryId: number, categoryName: string): string {
    const slug = generateCategorySlug(categoryName);
    return `/genre/${categoryId}/${slug}`;
}

export function handleCategoriesError(error: unknown): string {
    console.error("Erro ao carregar categorias:", error);
    return "Erro ao carregar categorias. Tente novamente.";
}
