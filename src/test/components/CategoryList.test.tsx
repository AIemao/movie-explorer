import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { tmdbService } from "../../api/tmdb";
import { CategoryList } from "../../components/CategoryList";
import { theme } from "../../styles/GlobalStyles";

// Mock do serviço TMDb
vi.mock("../../api/tmdb", () => ({
  tmdbService: {
    getGenres: vi.fn(),
    getMoviesByGenre: vi.fn(),
  },
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
}));

// Mock dos dados
const mockGenres = {
  genres: [
    { id: 28, name: "Ação" },
    { id: 35, name: "Comédia" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Terror" },
  ],
};

const mockMoviesResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: "Filme de Ação",
      poster_path: "/poster1.jpg",
      backdrop_path: "/backdrop1.jpg",
      release_date: "2023-06-15",
      vote_average: 8.5,
      overview: "Um filme de ação emocionante",
      genre_ids: [28],
    },
    {
      id: 2,
      title: "Filme de Ação 2",
      poster_path: "/poster2.jpg",
      backdrop_path: "/backdrop2.jpg",
      release_date: "2023-07-20",
      vote_average: 7.8,
      overview: "Outro filme de ação",
      genre_ids: [28],
    },
  ],
  total_pages: 1,
  total_results: 2,
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme.light}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe("CategoryList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.log(
      "API_KEY:",
      import.meta.env.VITE_TMDB_API_KEY ? "Carregada" : "Não encontrada"
    );
    console.log("BASE_URL:", import.meta.env.VITE_TMDB_BASE_URL);
    console.log("IMAGE_BASE_URL:", import.meta.env.VITE_TMDB_IMAGE_BASE_URL);
  });

  describe("Initial Loading and Genre Display", () => {
    it("should show loading spinner initially", () => {
      vi.mocked(tmdbService.getGenres).mockImplementation(
        () => new Promise(() => {}) // Promise que nunca resolve para simular loading
      );

      renderWithProviders(<CategoryList />);

      expect(screen.getByText("Carregando categorias...")).toBeInTheDocument();
    });

    it("should load and display genres correctly", async () => {
      vi.mocked(tmdbService.getGenres).mockResolvedValue(mockGenres);

      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(screen.getByText("Explorar por Categorias")).toBeInTheDocument();
      });

      // Verificar se todos os gêneros foram carregados
      mockGenres.genres.forEach((genre) => {
        expect(screen.getByText(genre.name)).toBeInTheDocument();
      });

      // Verificar se os botões têm os data-testids corretos
      expect(screen.getByTestId("category-card-28")).toBeInTheDocument();
      expect(screen.getByTestId("category-card-35")).toBeInTheDocument();
      expect(screen.getByTestId("category-card-18")).toBeInTheDocument();
      expect(screen.getByTestId("category-card-27")).toBeInTheDocument();
    });
    it("should handle genre loading error", async () => {
      const errorMessage = "Erro ao carregar gêneros";
      vi.mocked(tmdbService.getGenres).mockRejectedValue(
        new Error(errorMessage)
      );

      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(
          screen.getByText("Erro ao carregar categorias. Tente novamente.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Genre Selection and Movie Loading", () => {
    beforeEach(() => {
      vi.mocked(tmdbService.getGenres).mockResolvedValue(mockGenres);
    });

    it("should load movies when a genre is selected", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderWithProviders(<CategoryList />);

      // Aguardar os gêneros carregarem
      await waitFor(() => {
        expect(screen.getByText("Ação")).toBeInTheDocument();
      }); // Clicar no botão de Ação
      const actionButton = screen.getByText("Ação");
      fireEvent.click(actionButton); // Verificar se os filmes foram carregados
      await waitFor(() => {
        expect(screen.getAllByText("Filme de Ação")[0]).toBeInTheDocument();
        expect(screen.getAllByText("Filme de Ação 2")[0]).toBeInTheDocument();
      }); // Verificar se o grid de filmes está presente
      expect(screen.getByTestId("categories-grid")).toBeInTheDocument();
    });

    it("should show active state for selected genre", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );

      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(screen.getByText("Comédia")).toBeInTheDocument();
      });

      const comedyButton = screen.getByText("Comédia");
      fireEvent.click(comedyButton);
      await waitFor(() => {
        expect(comedyButton).toHaveAttribute("data-testid", "category-card-35");
      });
    });

    it("should handle movie loading error", async () => {
      vi.mocked(tmdbService.getMoviesByGenre).mockRejectedValue(
        new Error("Erro ao carregar filmes")
      );

      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(screen.getByText("Drama")).toBeInTheDocument();
      });

      const dramaButton = screen.getByText("Drama");
      fireEvent.click(dramaButton);
      await waitFor(() => {
        expect(
          screen.getByText("Erro ao carregar categorias. Tente novamente.")
        ).toBeInTheDocument();
      });
    });

    it("should show empty state when no movies found", async () => {
      const emptyResponse = {
        ...mockMoviesResponse,
        results: [],
        total_results: 0,
      };
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(emptyResponse);

      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(screen.getByText("Terror")).toBeInTheDocument();
      });

      const terrorButton = screen.getByText("Terror");
      fireEvent.click(terrorButton);

      await waitFor(() => {
        expect(
          screen.getByText("Nenhum filme encontrado para esta categoria.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Multiple Genre Selection", () => {
    beforeEach(() => {
      vi.mocked(tmdbService.getGenres).mockResolvedValue(mockGenres);
    });

    it("should switch between different genres correctly", async () => {
      const actionMovies = mockMoviesResponse;
      const comedyMovies = {
        ...mockMoviesResponse,
        results: [
          {
            id: 3,
            title: "Filme de Comédia",
            poster_path: "/comedy1.jpg",
            backdrop_path: "/comedy-backdrop.jpg",
            release_date: "2023-08-15",
            vote_average: 7.2,
            overview: "Uma comédia hilária",
            genre_ids: [35],
          },
        ],
      };

      vi.mocked(tmdbService.getMoviesByGenre)
        .mockResolvedValueOnce(actionMovies)
        .mockResolvedValueOnce(comedyMovies);

      renderWithProviders(<CategoryList />);

      // Aguardar carregamento dos gêneros
      await waitFor(() => {
        expect(screen.getByText("Ação")).toBeInTheDocument();
      }); // Selecionar Ação primeiro
      fireEvent.click(screen.getByText("Ação"));
      await waitFor(() => {
        expect(screen.getAllByText("Filme de Ação")[0]).toBeInTheDocument();
      }); // Depois selecionar Comédia
      fireEvent.click(screen.getByText("Comédia"));
      await waitFor(() => {
        expect(screen.getAllByText("Filme de Comédia")[0]).toBeInTheDocument();
      });

      // Verificar que os filmes de ação não estão mais visíveis
      expect(screen.queryByText("Filme de Ação")).not.toBeInTheDocument();

      // Verificar que o tmdbService foi chamado duas vezes
      expect(tmdbService.getMoviesByGenre).toHaveBeenCalledTimes(2);
      expect(tmdbService.getMoviesByGenre).toHaveBeenNthCalledWith(1, 28);
      expect(tmdbService.getMoviesByGenre).toHaveBeenNthCalledWith(2, 35);
    });
  });

  describe("Component Integration", () => {
    beforeEach(() => {
      vi.mocked(tmdbService.getGenres).mockResolvedValue(mockGenres);
      vi.mocked(tmdbService.getMoviesByGenre).mockResolvedValue(
        mockMoviesResponse
      );
    });

    it("should render movie cards with correct props", async () => {
      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(screen.getByText("Ação")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Ação"));
      await waitFor(() => {
        // Verificar se os MovieCards foram renderizados
        expect(screen.getByTestId("movie-card-1")).toBeInTheDocument();
        expect(screen.getByTestId("movie-card-2")).toBeInTheDocument();
      });

      // Verificar se o grid está presente
      const grid = screen.getByTestId("categories-grid");
      expect(grid).toBeInTheDocument();
    });

    it("should have correct accessibility attributes", async () => {
      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(screen.getByText("Ação")).toBeInTheDocument();
      });

      // Verificar se os botões têm atributos corretos
      const actionButton = screen.getByText("Ação");
      expect(actionButton).toHaveAttribute("data-testid", "category-card-28");

      // Testar interação com teclado (acessibilidade)
      actionButton.focus();
      expect(document.activeElement).toBe(actionButton);
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors gracefully", async () => {
      vi.mocked(tmdbService.getGenres).mockRejectedValue(
        new Error("Network Error")
      );

      renderWithProviders(<CategoryList />);
      await waitFor(() => {
        expect(
          screen.getByText("Erro ao carregar categorias. Tente novamente.")
        ).toBeInTheDocument();
      });

      // Verificar que não há botões de gênero quando há erro
      expect(screen.queryByText("Ação")).not.toBeInTheDocument();
      expect(screen.queryByText("Comédia")).not.toBeInTheDocument();
    });
    it("should handle movie loading error and still show genres", async () => {
      vi.mocked(tmdbService.getGenres).mockResolvedValue(mockGenres);
      vi.mocked(tmdbService.getMoviesByGenre).mockRejectedValue(
        new Error("Movie loading error")
      );

      renderWithProviders(<CategoryList />);

      await waitFor(() => {
        expect(screen.getByText("Ação")).toBeInTheDocument();
      });

      // Clicar em um gênero que vai dar erro
      fireEvent.click(screen.getByText("Ação"));

      await waitFor(() => {
        expect(
          screen.getByText("Erro ao carregar categorias. Tente novamente.")
        ).toBeInTheDocument();
      });

      // Verificar que o erro foi tratado corretamente
      expect(tmdbService.getMoviesByGenre).toHaveBeenCalledWith(28);
    });
  });
});
