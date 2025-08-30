// movieCard.constants.ts - Constantes para MovieCard
export const POSTER_PLACEHOLDER = '/api/placeholder/300/450';
export const POSTER_ALT_TEXT = 'Poster do filme';
export const DEFAULT_RATING = 0;
export const LOADING_TEXT = 'Carregando...';
export const DATE_NOT_AVAILABLE = 'Data não disponível';

// Animação keyframes como constantes
export const FADE_IN_ANIMATION = `
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const SHIMMER_ANIMATION = `
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;
