import React, { useEffect, useState } from "react";
import styled from "styled-components";
import type { Genre, MoviesResponse } from "../api/tmdb";
import { tmdbService } from "../api/tmdb";
import { Grid, LoadingSpinner } from "../styles/GlobalStyles";
import { MovieCard } from "./MovieCard";

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  text-align: center;
`;

const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${({ active, theme }) =>
    active ? theme.primary : "transparent"};
  color: ${({ active, theme }) => (active ? "white" : theme.text)};
  border: 2px solid ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.1rem;
  margin: 2rem 0;
`;

interface CategoryListProps {}

export const CategoryList: React.FC<CategoryListProps> = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<MoviesResponse | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbService.getGenres();
        setGenres(response.genres);
      } catch (err) {
        console.error("Erro ao carregar gêneros:", err);
        setError("Erro ao carregar gêneros");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = async (genreId: number) => {
    setSelectedGenre(genreId);
    setLoading(true);
    setError(null);

    try {
      const response = await tmdbService.getMoviesByGenre(genreId);
      setMovies(response);
    } catch (err) {
      console.error("Erro ao carregar filmes por gênero:", err);
      setError("Erro ao carregar filmes");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !movies) {
    return <LoadingSpinner>Carregando categorias...</LoadingSpinner>;
  }

  if (error && !movies) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Explorar por Categorias</Title>

      <CategoryButtons>
        {genres.map((genre) => (
          <CategoryButton
            key={genre.id}
            active={selectedGenre === genre.id}
            onClick={() => handleGenreClick(genre.id)}
            data-testid={`genre-button-${genre.id}`}
          >
            {genre.name}
          </CategoryButton>
        ))}
      </CategoryButtons>

      {loading && selectedGenre && (
        <LoadingSpinner>Carregando filmes...</LoadingSpinner>
      )}

      {error && selectedGenre && <ErrorMessage>{error}</ErrorMessage>}

      {movies && (
        <Grid data-testid="movies-grid">
          {movies.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      )}

      {selectedGenre && movies && movies.results.length === 0 && !loading && (
        <ErrorMessage>
          Nenhum filme encontrado para esta categoria.
        </ErrorMessage>
      )}
    </Container>
  );
};
