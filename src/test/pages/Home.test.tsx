import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MoviesResponse } from "../../api/tmdb";
import { tmdbService } from "../../api/tmdb";
import { Home } from "../../pages/Home";
import { theme } from "../../styles/GlobalStyles";

// Mock do tmdbService
vi.mock("../../api/tmdb", () => ({
  tmdbService: {
    getNowPlayingMovies: vi.fn(),
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
  };
});

// Typed mock
const mockTmdbService = vi.mocked(tmdbService);

// Mock data
const mockMoviesResponse: MoviesResponse = {
  page: 1,
  results: [
    {
      id: 123,
      title: "Filme Teste 1",
      overview: "Sinopse do filme teste 1",
      poster_path: "/teste1.jpg",
      backdrop_path: "/bg-teste1.jpg",
      release_date: "2023-01-15",
      vote_average: 8.5,
      genre_ids: [28, 12],
    },
    {
      id: 456,
      title: "Filme Teste 2",
      overview: "Sinopse do filme teste 2",
      poster_path: "/teste2.jpg",
      backdrop_path: "/bg-teste2.jpg",
      release_date: "2023-02-20",
      vote_average: 7.8,
      genre_ids: [16, 35],
    },
  ],
  total_pages: 3,
  total_results: 50,
};

const mockEmptyResponse: MoviesResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

const mockPage2Response: MoviesResponse = {
  page: 2,
  results: [
    {
      id: 789,
      title: "Filme Teste 3",
      overview: "Sinopse do filme teste 3",
      poster_path: "/teste3.jpg",
      backdrop_path: "/bg-teste3.jpg",
      release_date: "2023-03-25",
      vote_average: 9.1,
      genre_ids: [18, 10749],
    },
  ],
  total_pages: 3,
  total_results: 50,
};

// Test wrapper
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme.light}>{children}</ThemeProvider>
  </BrowserRouter>
);

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.error = vi.fn();
    console.log = vi.fn();
  });

  describe("Rendering and Initial State", () => {
    it("should show loading spinner initially", async () => {
      mockTmdbService.getNowPlayingMovies.mockImplementation(
        () => new Promise(() => {}) // Promise que nunca resolve para manter loading
      );

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      expect(
        screen.getByText("🎬 Descobrindo filmes incríveis para você...")
      ).toBeInTheDocument();
    });

    it("should render page title when data loads", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("🍿 Filmes em Cartaz")).toBeInTheDocument();
      });
    });

    it("should render movies grid when data loads", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("movies-grid")).toBeInTheDocument();
      });
    });
    it("should render movie cards correctly", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
        expect(screen.getByTestId("movie-card-456")).toBeInTheDocument();
      });
    });
  });

  describe("Data Loading and API Integration", () => {
    it("should call tmdbService.getNowPlayingMovies on mount", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      expect(mockTmdbService.getNowPlayingMovies).toHaveBeenCalledWith(1);
    });
    it("should handle API response correctly", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
        expect(screen.getByTestId("movie-card-456")).toBeInTheDocument();
      });
    });

    it("should display empty state when no movies found", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockEmptyResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(
          screen.getByText("Nenhum filme encontrado.")
        ).toBeInTheDocument();
      });
    });
    it("should load initial page correctly", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockTmdbService.getNowPlayingMovies).toHaveBeenCalledWith(1);
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
      });
    });
  });

  describe("Load More Functionality", () => {
    it("should show load more button when more pages available", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
        expect(screen.getByText("Carregar Mais")).toBeInTheDocument();
      });
    });

    it("should not show load more button when on last page", async () => {
      const lastPageResponse = {
        ...mockMoviesResponse,
        page: 3,
        total_pages: 3,
      };
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(lastPageResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(
          screen.queryByTestId("load-more-button")
        ).not.toBeInTheDocument();
      });
    });

    it("should load more movies when load more button is clicked", async () => {
      // Primeira chamada - página 1
      mockTmdbService.getNowPlayingMovies
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockResolvedValueOnce(mockPage2Response);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      ); // Esperar carregar página inicial
      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
      });

      // Clicar em "Carregar Mais"
      const loadMoreButton = screen.getByTestId("load-more-button");
      fireEvent.click(loadMoreButton);

      // Verificar segunda chamada da API
      await waitFor(() => {
        expect(mockTmdbService.getNowPlayingMovies).toHaveBeenCalledTimes(2);
        expect(mockTmdbService.getNowPlayingMovies).toHaveBeenCalledWith(2);
      });

      // Verificar se filme da página 2 foi adicionado
      await waitFor(() => {
        expect(screen.getByTestId("movie-card-789")).toBeInTheDocument();
      });
    });

    it("should show loading state in button when loading more", async () => {
      mockTmdbService.getNowPlayingMovies
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockImplementation(() => new Promise(() => {})); // Promise que nunca resolve

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );
      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
      });

      const loadMoreButton = screen.getByTestId("load-more-button");
      fireEvent.click(loadMoreButton);

      await waitFor(() => {
        expect(screen.getByText("Carregando...")).toBeInTheDocument();
        expect(loadMoreButton).toBeDisabled();
      });
    });

    it("should append new movies to existing list", async () => {
      mockTmdbService.getNowPlayingMovies
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockResolvedValueOnce(mockPage2Response);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );
      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
        expect(screen.getByTestId("movie-card-456")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("load-more-button"));

      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
        expect(screen.getByTestId("movie-card-456")).toBeInTheDocument();
        expect(screen.getByTestId("movie-card-789")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error message when API call fails", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockTmdbService.getNowPlayingMovies.mockRejectedValue(
        new Error("Network error")
      );

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(
        () => {
          expect(
            screen.getByText(
              "Erro ao carregar filmes. Verifique sua conexão e tente novamente."
            )
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro ao carregar filmes:",
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });

    it("should handle load more error gracefully", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      mockTmdbService.getNowPlayingMovies
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockRejectedValueOnce(new Error("Load more failed"));

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );
      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("load-more-button"));

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Erro ao carregar filmes:",
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Integration and Data Flow", () => {
    it("should manage loading states correctly during flow", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      // Estado inicial de loading pode aparecer brevemente
      // Aguardar dados carregarem
      await waitFor(
        () => {
          expect(screen.getByText("🍿 Filmes em Cartaz")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      expect(
        screen.queryByText("🎬 Descobrindo filmes incríveis para você...")
      ).not.toBeInTheDocument();
    });
    it("should handle page state transitions correctly", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(
        () => {
          expect(screen.getByText("🍿 Filmes em Cartaz")).toBeInTheDocument();
          expect(screen.getByTestId("movies-grid")).toBeInTheDocument();
          expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should work with different API response structures", async () => {
      const customResponse = {
        ...mockMoviesResponse,
        results: [mockMoviesResponse.results[0]], // Apenas um filme
        total_pages: 1,
      };

      mockTmdbService.getNowPlayingMovies.mockResolvedValue(customResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );
      await waitFor(() => {
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
        expect(
          screen.queryByTestId("load-more-button")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Accessibility and User Experience", () => {
    it("should have proper semantic structure", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        // Verificar título principal
        const title = screen.getByRole("heading", {
          name: "🍿 Filmes em Cartaz",
        });
        expect(title).toBeInTheDocument();

        // Verificar botão de carregar mais
        const loadMoreButton = screen.getByRole("button", {
          name: "Carregar Mais",
        });
        expect(loadMoreButton).toBeInTheDocument();
      });
    });

    it("should have proper test IDs for important elements", async () => {
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId("movies-grid")).toBeInTheDocument();
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
      });
    });
    it("should provide clear user feedback for different states", async () => {
      // Teste estado de sucesso com dados
      mockTmdbService.getNowPlayingMovies.mockResolvedValue(mockMoviesResponse);

      render(
        <TestWrapper>
          <Home />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText("🍿 Filmes em Cartaz")).toBeInTheDocument();
        expect(screen.getByTestId("movie-card-123")).toBeInTheDocument();
      });
    });
  });
});
