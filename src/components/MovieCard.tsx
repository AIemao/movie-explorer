import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import type { Movie } from "../api/tmdb";
import { IMAGE_BASE_URL } from "../api/tmdb";
import {
  FADE_IN_ANIMATION,
  POSTER_ALT_TEXT,
  SHIMMER_ANIMATION,
} from "./constants/movieCard.constants";
import {
  buildPosterUrl,
  formatRating,
  formatReleaseDate,
} from "./utils/movieCard.utils";

const fadeIn = keyframes`${FADE_IN_ANIMATION}`;

const shimmer = keyframes`${SHIMMER_ANIMATION}`;

const Card = styled(Link)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  color: inherit;
  position: relative;
  display: block;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 30px ${({ theme }) => theme.shadow};
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.background},
    ${({ theme }) => theme.surface}
  );
  overflow: hidden;
`;

const Poster = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s ease-out;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transform: ${({ $loaded }) => ($loaded ? "scale(1)" : "scale(1.1)")};
  animation: ${({ $loaded }) => ($loaded ? fadeIn : "none")} 0.6s ease-out;
`;

const PosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.background} 0px,
    rgba(255, 255, 255, 0.1) 40px,
    ${({ theme }) => theme.background} 80px
  );
  background-size: 600px;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 3rem;
  opacity: 0.7;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    transparent,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.9)
  );
  height: 60%;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  padding: 1.2rem;
  background: ${({ theme }) => theme.surface};
  position: relative;
  z-index: 2;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
`;

const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ReleaseDate = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  background: ${({ theme }) => theme.background};
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const QuickInfo = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  color: white;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const QuickTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
`;

const QuickRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
`;

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const posterUrl = buildPosterUrl(movie.poster_path, IMAGE_BASE_URL);
  const formattedDate = formatReleaseDate(movie.release_date);
  const formattedRating = formatRating(movie.vote_average);

  return (
    <Card to={`/movie/${movie.id}`} data-testid={`movie-card-${movie.id}`}>
      <PosterContainer>
        {posterUrl && !imageError ? (
          <>
            {!imageLoaded && <PosterPlaceholder>🎬</PosterPlaceholder>}
            <Poster
              src={posterUrl}
              alt={`${POSTER_ALT_TEXT} ${movie.title}`}
              loading="lazy"
              $loaded={imageLoaded}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <Overlay />
            <QuickInfo>
              <QuickTitle>{movie.title}</QuickTitle>
              <QuickRating>⭐ {formattedRating}</QuickRating>
            </QuickInfo>
          </>
        ) : (
          <PosterPlaceholder>🎬</PosterPlaceholder>
        )}
      </PosterContainer>

      <CardContent>
        <Title>{movie.title}</Title>
        <MovieInfo>
          <ReleaseDate>{formattedDate}</ReleaseDate>
          <Rating>⭐ {formattedRating}</Rating>
        </MovieInfo>
      </CardContent>
    </Card>
  );
}
