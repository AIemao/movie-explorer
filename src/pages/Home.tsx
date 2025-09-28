import { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import type { MoviesResponse } from "../api/tmdb";
import { tmdbService } from "../api/tmdb";
import { MovieCard } from "../components/MovieCard";
import { Container, Grid, LoadingSpinner } from "../styles/GlobalStyles";
import {
  LOADING_MESSAGE,
  NO_MOVIES_MESSAGE,
  PAGE_TITLE,
  TEST_IDS,
} from "./constants/home.constants";
import {
  getLoadMoreButtonText,
  handleApiError,
  shouldLoadMore,
} from "./utils/home.utils";

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

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 3rem 0 2rem 0;
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

const HomeContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding-bottom: 3rem;
  background: ${({ theme }) => theme.background};
`;

// MoviesGrid removido pois Grid do GlobalStyles é suficiente
// const MoviesGrid = styled(Grid)`
//   & > * {
//     animation: ${fadeInUp} 0.6s ease-out;
//     animation-fill-mode: both;
//   }

//   & > *:nth-child(1) {
//     animation-delay: 0.1s;
//   }
//   & > *:nth-child(2) {
//     animation-delay: 0.2s;
//   }
//   & > *:nth-child(3) {
//     animation-delay: 0.3s;
//   }
//   & > *:nth-child(4) {
//     animation-delay: 0.4s;
//   }
//   & > *:nth-child(5) {
//     animation-delay: 0.5s;
//   }
//   & > *:nth-child(6) {
//     animation-delay: 0.6s;
//   }
//   & > *:nth-child(7) {
//     animation-delay: 0.7s;
//   }
//   & > *:nth-child(8) {
//     animation-delay: 0.8s;
//   }
// `;

export function Home() {
  const [movies, setMovies] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const response = await tmdbService.getNowPlayingMovies(page);

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
    []
  );

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const handleLoadMore = () => {
    if (shouldLoadMore(movies, currentPage)) {
      fetchMovies(currentPage + 1, true);
    }
  };

  if (loading) {
    return (
      <HomeContainer data-testid="home-page">
        <Container>
          <LoadingSpinner>{LOADING_MESSAGE}</LoadingSpinner>
        </Container>
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer data-testid="home-page">
        <Container>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer data-testid="home-page">
      <Container>
        <Title>{PAGE_TITLE}</Title>

        {movies && (
          <>
            <Grid data-testid={TEST_IDS.MOVIES_GRID}>
              {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Grid>

            {shouldLoadMore(movies, currentPage) && (
              <LoadMoreButton
                onClick={handleLoadMore}
                disabled={loadingMore}
                data-testid={TEST_IDS.LOAD_MORE_BUTTON}
              >
                {getLoadMoreButtonText(loadingMore)}
              </LoadMoreButton>
            )}
          </>
        )}

        {movies && movies.results.length === 0 && (
          <ErrorMessage>{NO_MOVIES_MESSAGE}</ErrorMessage>
        )}
      </Container>
    </HomeContainer>
  );
}
