// header.constants.ts - Constantes para Header
export const HEADER_HEIGHT = '80px';
export const APP_TITLE = '🎭 CineDiscover';
export const THEME_TOGGLE_ARIA_LABEL = 'Alternar tema';
export const NAVIGATION_ARIA_LABEL = 'Navegação principal';

export const THEME_ICONS = {
    LIGHT: '🌙',
    DARK: '☀️',
} as const;

export const NAVIGATION_ITEMS = [
    { label: 'Início', path: '/' },
    { label: 'Categorias', path: '/categories' },
] as const;
