import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({}),
    Link: actual.Link,
  };
});

// Estrutura padrão de testes

describe("App", () => {
  describe("Rendering and Initial State", () => {
    it("deve renderizar o componente principal sem crash", () => {
      render(<App />);
      expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
    });
    // ...outros testes de renderização
  });

  describe("Theme Management", () => {
    it("deve alternar o tema entre claro e escuro ao clicar no botão de toggle", () => {
      window.history.pushState({}, "", "/");
      render(<App />);
      const toggleBtn = screen.getByTestId("theme-toggle");
      const homeContainer = screen.getByTestId("home-page");
      // Verifica background do container
      expect(homeContainer).toHaveStyle({ background: "#fff" }); // tema claro
      act(() => {
        toggleBtn.click();
      });
      expect(homeContainer).toHaveStyle({ background: "#1a1a1a" }); // tema escuro
    });
  });

  describe("Routing Structure", () => {
    it("deve renderizar a página Home na rota raiz", () => {
      window.history.pushState({}, "", "/");
      render(<App />);
      // Adiciona fallback para data-testid
      expect(
        screen.getByTestId("home-page") ||
          screen.getByText(/descobrindo filmes/i)
      ).toBeTruthy();
    });
    it("deve renderizar a página MoviePage na rota /movie/:id", () => {
      window.history.pushState({}, "", "/movie/1");
      render(<App />);
      expect(screen.getByTestId("movie-page")).toBeInTheDocument();
    });
  });

  describe("Component Integration", () => {
    it("deve integrar Header, ThemeProvider e GlobalStyles corretamente", () => {
      render(<App />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
      // Verifica se algum estilo global foi aplicado
      const styleTags = Array.from(
        document.head.querySelectorAll("style[data-styled]")
      ).map((tag) => tag.innerHTML);
      expect(styleTags.some((css) => css.includes("background"))).toBe(true);
    });
  });

  describe("localStorage Integration", () => {
    it("deve persistir o tema selecionado no localStorage", () => {
      localStorage.clear();
      window.history.pushState({}, "", "/");
      render(<App />);
      const toggleBtn = screen.getByTestId("theme-toggle");
      act(() => {
        toggleBtn.click();
      });
      expect(localStorage.getItem("theme")).toBe("dark");
      act(() => {
        toggleBtn.click();
      });
      expect(localStorage.getItem("theme")).toBe("light");
    });
    it("deve recuperar o tema salvo ao inicializar", () => {
      localStorage.setItem("theme", "dark");
      window.history.pushState({}, "", "/");
      render(<App />);
      const homeContainer = screen.getByTestId("home-page");
      expect(homeContainer).toHaveStyle({ background: "#1a1a1a" });
    });
  });

  describe("Accessibility", () => {
    it('deve garantir que o Header tenha role="banner" para acessibilidade', () => {
      render(<App />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
  });
});
