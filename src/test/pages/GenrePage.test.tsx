import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { tmdbService } from "../../api/tmdb";
import { GenrePage } from "../../pages/GenrePage";
import { GlobalStyles, theme } from "../../styles/GlobalStyles";

// Mock do tmdbService
vi.mock("../../api/tmdb", () => ({
  tmdbService: {
    getMoviesByGenre: vi.fn(),
  },
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
}));

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper para renderizar o componente com contexto
const renderGenrePage = (genreId: string = "28", genreName?: string) => {
  const url = genreName
    ? `/genre/${genreId}/${genreName}`
    : `/genre/${genreId}`;
  return render(
    <MemoryRouter initialEntries={[url]}>
      <ThemeProvider theme={theme.light}>
        <GlobalStyles />
        <Routes>
          <Route path="/genre/:genreId/:genreName?" element={<GenrePage />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );
};

// Mock data para os testes
const mockMoviesResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: "Filme de Ação 1",
      overview: "Descrição do filme de ação 1",
      poster_path: "/poster1.jpg",
      backdrop_path: "/backdrop1.jpg",
      release_date: "2023-01-15",
      vote_average: 8.5,
      genre_ids: [28],
    },
    {
      id: 2,
      title: "Filme de Ação 2",
      overview: "Descrição do filme de ação 2",
      poster_path: "/poster2.jpg",
      backdrop_path: "/backdrop2.jpg",
      release_date: "2023-02-20",
      vote_average: 7.8,
      genre_ids: [28],
    },
  ],
  total_pages: 5,
  total_results: 100,
};

const mockEmptyResponse = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

describe("GenrePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.error = vi.fn(); // Mock console.error para testes de erro
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering and Initial State", () => {
    it("should show loading spinner initially", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockImplementation(
        () => new Promise(() => {}) // Promise que nunca resolve para manter loading
      );
      renderGenrePage("28", "Ação");

      expect(
        screen.getByText("🎭 Descobrindo filmes de Ação...")
      ).toBeInTheDocument();
    });
    it("should render page title and movies when data loads", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage("28", "Ação");

      await waitFor(() => {
        expect(screen.getByText("Filmes de Ação")).toBeInTheDocument();
      });

      // Verifica se os filmes aparecem (pode haver múltiplos elementos com o mesmo texto)
      expect(screen.getAllByText("Filme de Ação 1")).toHaveLength(2);
      expect(screen.getAllByText("Filme de Ação 2")).toHaveLength(2);
      expect(screen.getByTestId("genre-movies-grid")).toBeInTheDocument();
    });

    it("should render back button with correct text", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByTestId("back-button")).toBeInTheDocument();
      });

      expect(screen.getByText("🎬 Voltar")).toBeInTheDocument();
    });

    it("should render load more button when more pages available", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
      });

      expect(screen.getByText("Carregar Mais")).toBeInTheDocument();
    });
  });

  describe("Data Loading and API Integration", () => {
    it("should call tmdbService.getMoviesByGenre with correct parameters", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage("28", "Ação");

      await waitFor(() => {
        expect(tmdbService.getMoviesByGenre).toHaveBeenCalledWith(28, 1);
      });
    });
    it("should handle API response correctly", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getAllByText("Filme de Ação 1")).toHaveLength(2);
        expect(screen.getAllByText("Filme de Ação 2")).toHaveLength(2);
      });
    });
    it("should display empty state when no movies found", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockEmptyResponse
      );

      renderGenrePage("28", "Ação");

      await waitFor(() => {
        expect(
          screen.getByText("🎪 Ops! Não encontramos filmes para o gênero Ação.")
        ).toBeInTheDocument();
      });

      // Grid é renderizado mas vazio, e load more não deve aparecer
      expect(screen.getByTestId("genre-movies-grid")).toBeInTheDocument();
      expect(screen.queryByTestId("load-more-button")).not.toBeInTheDocument();
    });
    it("should not show load more button when on last page", async () => {
      const lastPageResponse = {
        page: 1,
        results: [
          {
            id: 1,
            title: "Único Filme",
            overview: "Este é o único filme",
            poster_path: "/poster1.jpg",
            backdrop_path: "/backdrop1.jpg",
            release_date: "2023-01-15",
            vote_average: 8.5,
            genre_ids: [28],
          },
        ],
        total_pages: 1, // Só tem 1 página
        total_results: 1,
      };

      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        lastPageResponse
      );

      renderGenrePage("28", "Ação");

      await waitFor(() => {
        expect(screen.getAllByText("Único Filme")).toHaveLength(2);
      });

      // Se total_pages = 1 e currentPage = 1, então currentPage < total_pages = false
      expect(screen.queryByTestId("load-more-button")).not.toBeInTheDocument();
    });
  });

  describe("Load More Functionality", () => {
    it("should load more movies when load more button is clicked", async () => {
      const page2Response = {
        page: 2,
        results: [
          {
            id: 3,
            title: "Filme de Ação 3",
            overview: "Descrição do filme de ação 3",
            poster_path: "/poster3.jpg",
            backdrop_path: "/backdrop3.jpg",
            release_date: "2023-03-15",
            vote_average: 7.2,
            genre_ids: [28],
          },
        ],
        total_pages: 5,
        total_results: 100,
      };

      vi.mocked(tmdbService.getMoviesByGenre)
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockResolvedValueOnce(page2Response);

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("load-more-button"));

      await waitFor(() => {
        expect(tmdbService.getMoviesByGenre).toHaveBeenCalledWith(28, 2);
      });
      await waitFor(() => {
        expect(screen.getAllByText("Filme de Ação 3")).toHaveLength(2);
      });

      // Deve manter os filmes anteriores
      expect(screen.getAllByText("Filme de Ação 1")).toHaveLength(2);
      expect(screen.getAllByText("Filme de Ação 2")).toHaveLength(2);
    });

    it("should show loading state in button when loading more", async () => {
      vi.mocked(tmdbService.getMoviesByGenre)
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockImplementation(() => new Promise(() => {})); // Promise que nunca resolve

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("load-more-button"));

      await waitFor(() => {
        expect(screen.getByText("Carregando...")).toBeInTheDocument();
      });

      expect(screen.getByTestId("load-more-button")).toBeDisabled();
    });

    it("should append new movies to existing list", async () => {
      const page2Response = {
        page: 2,
        results: [
          {
            id: 3,
            title: "Novo Filme",
            overview: "Novo filme adicionado",
            poster_path: "/new-poster.jpg",
            backdrop_path: "/new-backdrop.jpg",
            release_date: "2023-04-01",
            vote_average: 8.0,
            genre_ids: [28],
          },
        ],
        total_pages: 5,
        total_results: 100,
      };

      vi.mocked(tmdbService.getMoviesByGenre)
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockResolvedValueOnce(page2Response);

      renderGenrePage();
      await waitFor(() => {
        expect(screen.getAllByText("Filme de Ação 1")).toHaveLength(2);
        expect(screen.getAllByText("Filme de Ação 2")).toHaveLength(2);
      });

      fireEvent.click(screen.getByTestId("load-more-button"));
      await waitFor(() => {
        expect(screen.getAllByText("Novo Filme")).toHaveLength(2);
      });

      // Deve ter todos os filmes (2 + 1 = 3)
      const movieCards = screen.getAllByRole("link");
      expect(movieCards).toHaveLength(3);
    });
  });

  describe("Navigation and User Interactions", () => {
    it("should navigate back when back button is clicked", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByTestId("back-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("back-button"));

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it("should work with different genre parameters", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage("35", "Comédia");

      await waitFor(() => {
        expect(tmdbService.getMoviesByGenre).toHaveBeenCalledWith(35, 1);
      });

      await waitFor(() => {
        expect(screen.getByText("Filmes de Comédia")).toBeInTheDocument();
      });
    });
    it("should handle missing genre name gracefully", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage("28", undefined);

      await waitFor(() => {
        expect(screen.getByText("Filmes por Gênero")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error message when API call fails", async () => {
      const errorMessage = "Network Error";
      vi.mocked(tmdbService.getMoviesByGenre).mockRejectedValue(
        new Error(errorMessage)
      );

      renderGenrePage();

      await waitFor(() => {
        expect(
          screen.getByText(
            "Erro ao carregar filmes. Verifique sua conexão e tente novamente."
          )
        ).toBeInTheDocument();
      });

      expect(console.error).toHaveBeenCalledWith(
        "Erro ao carregar filmes por gênero:",
        expect.any(Error)
      );
    });

    it("should show back button even when there is an error", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockRejectedValue(
        new Error("API Error")
      );

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByTestId("back-button")).toBeInTheDocument();
      });

      expect(screen.getByText("🎬 Voltar")).toBeInTheDocument();
    });
    it("should handle load more error gracefully", async () => {
      vi.mocked(tmdbService.getMoviesByGenre)
        .mockResolvedValueOnce(mockMoviesResponse)
        .mockRejectedValueOnce(new Error("Load more error"));

      renderGenrePage("28", "Ação");

      await waitFor(() => {
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("load-more-button"));

      await waitFor(() => {
        expect(
          screen.getByText(
            "Erro ao carregar filmes. Verifique sua conexão e tente novamente."
          )
        ).toBeInTheDocument();
      });

      // Quando há erro no load more, o componente vai para estado de erro global
      // O botão back ainda deve estar presente
      expect(screen.getByTestId("back-button")).toBeInTheDocument();
    });
  });

  describe("Accessibility and User Experience", () => {
    it("should have proper semantic structure", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      });

      expect(screen.getByTestId("back-button")).toHaveAttribute(
        "aria-label",
        "Voltar para página anterior"
      );
      expect(screen.getByTestId("load-more-button")).toHaveAttribute(
        "aria-label",
        "Carregar mais filmes"
      );
    });

    it("should have proper test IDs for important elements", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderGenrePage();

      await waitFor(() => {
        expect(screen.getByTestId("genre-movies-grid")).toBeInTheDocument();
        expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
        expect(screen.getByTestId("back-button")).toBeInTheDocument();
      });
    });

    it("should provide clear user feedback for different states", async () => {
      // Estado de loading
      vi.mocked(tmdbService.getMoviesByGenre).mockImplementation(
        () => new Promise(() => {})
      );

      renderGenrePage("28", "Ação");

      expect(
        screen.getByText("🎭 Descobrindo filmes de Ação...")
      ).toBeInTheDocument();

      // Estado vazio
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockEmptyResponse
      );

      renderGenrePage("28", "Drama");

      await waitFor(() => {
        expect(
          screen.getByText(
            "🎪 Ops! Não encontramos filmes para o gênero Drama."
          )
        ).toBeInTheDocument();
      });
    });
  });
});
