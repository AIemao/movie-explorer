import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MovieDetails as MovieDetailsType } from "../../api/tmdb";
import { tmdbService } from "../../api/tmdb";
import { MovieDetails } from "../../components/MovieDetails";
import { theme } from "../../styles/GlobalStyles";

// Mock do tmdbService
vi.mock("../../api/tmdb", () => ({
  tmdbService: {
    getMovieDetails: vi.fn(),
  },
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
}));

// Mock do React Router
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "123" }),
  };
});

// Typed mock
const mockTmdbService = vi.mocked(tmdbService);

// Mock data
const mockMovieDetails: MovieDetailsType = {
  id: 123,
  title: "Filme de Teste",
  overview: "Uma sinopse detalhada do filme de teste para validação.",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  release_date: "2023-07-15",
  vote_average: 8.5,
  genre_ids: [28, 12],
  genres: [
    { id: 28, name: "Ação" },
    { id: 12, name: "Aventura" },
  ],
  runtime: 142,
  production_companies: [
    {
      id: 1,
      name: "Warner Bros.",
      logo_path: "/warner-logo.png",
    },
    {
      id: 2,
      name: "Universal Pictures",
      logo_path: "/universal-logo.png",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
    {
      iso_3166_1: "GB",
      name: "United Kingdom",
    },
  ],
};

// Helper para renderizar com providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme.dark}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe("MovieDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  describe("Rendering and Initial State", () => {
    it("should show loading spinner initially", () => {
      mockTmdbService.getMovieDetails.mockImplementation(
        () => new Promise(() => {})
      );

      renderWithProviders(<MovieDetails />);

      expect(
        screen.getByText("Carregando detalhes do filme...")
      ).toBeInTheDocument();
    });

    it("should render movie details correctly when data is loaded", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByTestId("movie-title")).toHaveTextContent(
          "Filme de Teste"
        );
      });

      expect(screen.getByTestId("movie-overview")).toHaveTextContent(
        "Uma sinopse detalhada do filme de teste para validação."
      );
      expect(screen.getByText("← Voltar")).toBeInTheDocument();
    });

    it("should render poster image when poster_path is available", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        const poster = screen.getByAltText("Poster do filme Filme de Teste");
        expect(poster).toBeInTheDocument();
        expect(poster).toHaveAttribute(
          "src",
          "https://image.tmdb.org/t/p/w500/test-poster.jpg"
        );
      });
    });

    it("should render placeholder when poster_path is not available", async () => {
      const movieWithoutPoster = { ...mockMovieDetails, poster_path: null };
      mockTmdbService.getMovieDetails.mockResolvedValue(movieWithoutPoster);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByText("🎬")).toBeInTheDocument();
      });
    });
  });

  describe("Data Loading and API Integration", () => {
    it("should call tmdbService.getMovieDetails with correct movie ID", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(mockTmdbService.getMovieDetails).toHaveBeenCalledWith(123);
      });
    });

    it("should handle API response correctly", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByTestId("movie-title")).toHaveTextContent(
          mockMovieDetails.title
        );
        expect(screen.getByTestId("movie-overview")).toHaveTextContent(
          mockMovieDetails.overview
        );
      });
    });
    it("should display formatted meta information correctly", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByText(/📅/)).toBeInTheDocument();
        expect(screen.getByText(/14 de julho de 2023/)).toBeInTheDocument();
        expect(screen.getByText(/⏱️/)).toBeInTheDocument();
        expect(screen.getByText(/2h 22min/)).toBeInTheDocument();
        expect(screen.getByText(/⭐/)).toBeInTheDocument();
        expect(screen.getByText(/8\.5/)).toBeInTheDocument();
      });
    });
    it("should render production information correctly", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByText("Informações de Produção")).toBeInTheDocument();
        expect(screen.getByText(/Warner Bros\./)).toBeInTheDocument();
        expect(screen.getByText(/Universal Pictures/)).toBeInTheDocument();
        expect(
          screen.getByText(/United States of America/)
        ).toBeInTheDocument();
        expect(screen.getByText(/United Kingdom/)).toBeInTheDocument();
      });
    });
  });

  describe("User Interactions", () => {
    it("should navigate back when back button is clicked", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByTestId("back-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("back-button"));

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it("should render genre links with correct navigation paths", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        const actionGenreLink = screen.getByTestId("genre-link-28");
        const adventureGenreLink = screen.getByTestId("genre-link-12");

        expect(actionGenreLink).toHaveAttribute(
          "href",
          "/genre/28/A%C3%A7%C3%A3o"
        );
        expect(adventureGenreLink).toHaveAttribute(
          "href",
          "/genre/12/Aventura"
        );
        expect(actionGenreLink).toHaveTextContent("Ação");
        expect(adventureGenreLink).toHaveTextContent("Aventura");
      });
    });

    it("should handle genre link clicks correctly", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        const genreLink = screen.getByTestId("genre-link-28");
        expect(genreLink).toBeInTheDocument();

        // Verificar que é um link válido
        expect(genreLink.tagName).toBe("A");
        expect(genreLink).toHaveAttribute("href");
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error message when API call fails", async () => {
      const apiError = new Error("Network error");
      mockTmdbService.getMovieDetails.mockRejectedValue(apiError);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(
          screen.getByText("Erro ao carregar detalhes do filme")
        ).toBeInTheDocument();
      });
    });
    it("should display default error when movie is not found", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(
        null as unknown as MovieDetailsType
      );

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByText("Filme não encontrado")).toBeInTheDocument();
      });
    });
    it("should handle API being called with valid ID", () => {
      // This test verifies the API is called with the mocked ID
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      // Should call API with the mocked ID from useParams
      expect(mockTmdbService.getMovieDetails).toHaveBeenCalledWith(123);
    });
  });

  describe("Data Formatting", () => {
    it("should format runtime correctly for different durations", async () => {
      const testCases = [
        { runtime: 90, expected: "1h 30min" },
        { runtime: 120, expected: "2h 0min" },
        { runtime: 45, expected: "0h 45min" },
      ];

      for (const testCase of testCases) {
        const movieWithRuntime = {
          ...mockMovieDetails,
          runtime: testCase.runtime,
        };
        mockTmdbService.getMovieDetails.mockResolvedValue(movieWithRuntime);

        const { unmount } = renderWithProviders(<MovieDetails />);

        await waitFor(() => {
          expect(
            screen.getByText(`⏱️ ${testCase.expected}`)
          ).toBeInTheDocument();
        });

        unmount();
      }
    });
    it("should format release date correctly", async () => {
      const movieWithDate = { ...mockMovieDetails, release_date: "2024-12-25" };
      mockTmdbService.getMovieDetails.mockResolvedValue(movieWithDate);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByText(/24 de dezembro de 2024/)).toBeInTheDocument();
      });
    });

    it("should format rating correctly", async () => {
      const movieWithRating = { ...mockMovieDetails, vote_average: 7.654 };
      mockTmdbService.getMovieDetails.mockResolvedValue(movieWithRating);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByText("⭐ 7.7")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "← Voltar" })
        ).toBeInTheDocument();
        expect(screen.getAllByRole("link")).toHaveLength(2); // Genre links
      });
    });

    it("should have proper alt text for poster image", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        const poster = screen.getByAltText("Poster do filme Filme de Teste");
        expect(poster).toBeInTheDocument();
      });
    });

    it("should have proper test IDs for important elements", async () => {
      mockTmdbService.getMovieDetails.mockResolvedValue(mockMovieDetails);

      renderWithProviders(<MovieDetails />);

      await waitFor(() => {
        expect(screen.getByTestId("back-button")).toBeInTheDocument();
        expect(screen.getByTestId("movie-title")).toBeInTheDocument();
        expect(screen.getByTestId("movie-overview")).toBeInTheDocument();
        expect(screen.getByTestId("genre-link-28")).toBeInTheDocument();
        expect(screen.getByTestId("genre-link-12")).toBeInTheDocument();
      });
    });
  });
});
