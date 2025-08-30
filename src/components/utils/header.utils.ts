// header.utils.ts - Funções auxiliares para Header
export function getThemeToggleLabel(isDark: boolean): string {
    return isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro';
}

export function getThemeToggleIcon(isDark: boolean): string {
    return isDark ? '☀️' : '🌙';
}

export function getNavigationItems() {
    return [
        { label: 'Início', path: '/' },
        { label: 'Categorias', path: '/categories' },
    ];
}
