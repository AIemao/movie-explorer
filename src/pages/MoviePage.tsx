import { MovieDetails } from "../components/MovieDetails";
import { Container } from "../styles/GlobalStyles";

export function MoviePage() {
  return (
    <Container data-testid="movie-page">
      <MovieDetails />
    </Container>
  );
}
