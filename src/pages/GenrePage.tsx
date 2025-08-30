import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import type { MoviesResponse } from "../api/tmdb";
import { tmdbService } from "../api/tmdb";
import { MovieCard } from "../components/MovieCard";
import { Container, Grid, LoadingSpinner } from "../styles/GlobalStyles";
import {
  ARIA_LABELS,
  BACK_BUTTON_TEXT,
  TEST_IDS,
} from "./constants/genrePage.constants";
import {
  getEmptyStateMessage,
  getLoadMoreButtonText,
  getLoadingMessage,
  getPageTitle,
  handleApiError,
  shouldLoadMore,
} from "./utils/genrePage.utils";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BackButton = styled.button`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.primaryHover}
  );
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PageTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 2rem 0;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.primaryHover}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const LoadMoreButton = styled.button`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.primaryHover}
  );
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin: 3rem auto;
  display: block;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;

    &:hover {
      transform: none;
      box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
    }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.2rem;
  margin: 3rem 0;
  padding: 2rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 12px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const GenrePageContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding-bottom: 3rem;
  background: ${({ theme }) => theme.background};
`;

const MoviesGrid = styled(Grid)`
  & > * {
    animation: ${fadeInUp} 0.6s ease-out;
    animation-fill-mode: both;
  }

  & > *:nth-child(1) {
    animation-delay: 0.1s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.4s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.5s;
  }
  & > *:nth-child(6) {
    animation-delay: 0.6s;
  }
  & > *:nth-child(7) {
    animation-delay: 0.7s;
  }
  & > *:nth-child(8) {
    animation-delay: 0.8s;
  }
`;

export function GenrePage() {
  const { genreId, genreName } = useParams<{
    genreId: string;
    genreName: string;
  }>();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMoviesByGenre = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (!genreId) return;

      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const response = await tmdbService.getMoviesByGenre(
          parseInt(genreId),
          page
        );

        if (append) {
          setMovies((prevMovies) =>
            prevMovies
              ? {
                  ...response,
                  results: [...prevMovies.results, ...response.results],
                }
              : response
          );
        } else {
          setMovies(response);
        }
        setCurrentPage(page);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [genreId]
  );

  useEffect(() => {
    if (genreId) {
      fetchMoviesByGenre(1);
    }
  }, [genreId, fetchMoviesByGenre]);

  const handleLoadMore = () => {
    if (shouldLoadMore(movies, currentPage)) {
      fetchMoviesByGenre(currentPage + 1, true);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <GenrePageContainer>
        <Container>
          <LoadingSpinner>{getLoadingMessage(genreName)}</LoadingSpinner>
        </Container>
      </GenrePageContainer>
    );
  }

  if (error) {
    return (
      <GenrePageContainer>
        <Container>
          <BackButton
            onClick={handleGoBack}
            aria-label={ARIA_LABELS.BACK_BUTTON}
            data-testid={TEST_IDS.BACK_BUTTON}
          >
            {BACK_BUTTON_TEXT}
          </BackButton>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </GenrePageContainer>
    );
  }

  return (
    <GenrePageContainer>
      <Container>
        <BackButton
          onClick={handleGoBack}
          aria-label={ARIA_LABELS.BACK_BUTTON}
          data-testid={TEST_IDS.BACK_BUTTON}
        >
          {BACK_BUTTON_TEXT}
        </BackButton>

        <PageTitle>{getPageTitle(genreName)}</PageTitle>

        {movies && (
          <>
            <MoviesGrid data-testid={TEST_IDS.GENRE_MOVIES_GRID}>
              {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </MoviesGrid>

            {shouldLoadMore(movies, currentPage) && (
              <LoadMoreButton
                onClick={handleLoadMore}
                disabled={loadingMore}
                data-testid={TEST_IDS.LOAD_MORE_BUTTON}
                aria-label={ARIA_LABELS.LOAD_MORE_BUTTON}
              >
                {getLoadMoreButtonText(loadingMore)}
              </LoadMoreButton>
            )}
          </>
        )}

        {movies && movies.results.length === 0 && (
          <ErrorMessage>{getEmptyStateMessage(genreName)}</ErrorMessage>
        )}
      </Container>
    </GenrePageContainer>
  );
}
