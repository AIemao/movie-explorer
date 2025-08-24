import React from "react";
import { MovieDetails } from "../components/MovieDetails";
import { Container } from "../styles/GlobalStyles";

export const MoviePage: React.FC = () => {
  return (
    <Container>
      <MovieDetails />
    </Container>
  );
};
