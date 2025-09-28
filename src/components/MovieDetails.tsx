import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import type { MovieDetails as MovieDetailsType } from "../api/tmdb";
import { IMAGE_BASE_URL, tmdbService } from "../api/tmdb";
import { LoadingSpinner } from "../styles/GlobalStyles";
import {
  formatRating,
  formatReleaseDate,
  formatRuntime,
} from "./utils/movieDetails.utils";

const Container = styled.div`
  padding: 2rem 0;
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const MovieHeader = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
`;

const PosterPlaceholder = styled.div`
  width: 100%;
  height: 450px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 4rem;
`;

const MovieInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const GenreTag = styled(Link)`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
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
    transition: left 0.3s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    background-color: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(1.02);
  }
`;

const Overview = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const ProductionInfo = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  color: ${({ theme }) => theme.textSecondary};
`;

const InfoLabel = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff6b6b;
  font-size: 1.1rem;
  margin: 2rem 0;
`;

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const movieData = await tmdbService.getMovieDetails(parseInt(id));
        setMovie(movieData);
      } catch (err) {
        console.error("Erro ao carregar detalhes do filme:", err);
        setError("Erro ao carregar detalhes do filme");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <LoadingSpinner>Carregando detalhes do filme...</LoadingSpinner>;
  }

  if (error || !movie) {
    return <ErrorMessage>{error || "Filme não encontrado"}</ErrorMessage>;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)} data-testid="back-button">
        ← Voltar
      </BackButton>

      <MovieHeader>
        {movie.poster_path ? (
          <Poster
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`Poster do filme ${movie.title}`}
          />
        ) : (
          <PosterPlaceholder>🎬</PosterPlaceholder>
        )}

        <MovieInfo>
          <Title data-testid="movie-title">{movie.title}</Title>
          <MetaInfo>
            {" "}
            <MetaItem>📅 {formatReleaseDate(movie.release_date)}</MetaItem>
            <MetaItem>⏱️ {formatRuntime(movie.runtime)}</MetaItem>
            <MetaItem>⭐ {formatRating(movie.vote_average)}</MetaItem>
          </MetaInfo>{" "}
          <Genres>
            {movie.genres.map((genre) => (
              <GenreTag
                key={genre.id}
                to={`/genre/${genre.id}/${encodeURIComponent(genre.name)}`}
                data-testid={`genre-link-${genre.id}`}
              >
                {genre.name}
              </GenreTag>
            ))}
          </Genres>
          <Section>
            <SectionTitle>Sinopse</SectionTitle>
            <Overview data-testid="movie-overview">
              {movie.overview || "Sinopse não disponível."}
            </Overview>
          </Section>
        </MovieInfo>
      </MovieHeader>

      <ProductionInfo>
        <SectionTitle>Informações de Produção</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Produtoras</InfoLabel>
            {movie.production_companies.map((company, index) => (
              <div key={company.id}>
                {company.name}
                {index < movie.production_companies.length - 1 ? ", " : ""}
              </div>
            ))}
          </InfoItem>

          <InfoItem>
            <InfoLabel>Países</InfoLabel>
            {movie.production_countries.map((country, index) => (
              <div key={country.iso_3166_1}>
                {country.name}
                {index < movie.production_countries.length - 1 ? ", " : ""}
              </div>
            ))}
          </InfoItem>
        </InfoGrid>
      </ProductionInfo>
    </Container>
  );
};
