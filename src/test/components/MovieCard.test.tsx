import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, expect, it } from "vitest";
import type { Movie } from "../../api/tmdb";
import { MovieCard } from "../../components/MovieCard";
import { theme } from "../../styles/GlobalStyles";

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  overview: "A test movie description",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  release_date: "2025-01-01",
  vote_average: 8.5,
  genre_ids: [28, 12],
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme.light}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe("MovieCard", () => {
  it("should render movie information correctly", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);

    expect(screen.getAllByText("Test Movie")[0]).toBeInTheDocument();
    expect(screen.getAllByText(/8.5/)[0]).toBeInTheDocument();
    expect(screen.getByTestId("movie-card-1")).toBeInTheDocument();
  });

  it("should format release date correctly", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);

    // Should display formatted date in Portuguese (date might vary based on timezone)
    expect(
      screen.getByText(/de jan. de 2025|31 de dez. de 2024/)
    ).toBeInTheDocument();
  });

  it("should have correct navigation link", () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);

    const movieLink = screen.getByTestId("movie-card-1");
    expect(movieLink).toHaveAttribute("href", "/movie/1");
  });

  it("should show placeholder when no poster available", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    renderWithProviders(<MovieCard movie={movieWithoutPoster as any} />);

    expect(screen.getByText("🎬")).toBeInTheDocument();
  });
});
