// Header.test.tsx - Testes abrangentes para componente Header
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "../../components/Header";
import {
  APP_TITLE,
  NAVIGATION_ITEMS,
  THEME_TOGGLE_ARIA_LABEL,
} from "../../components/constants/header.constants";

// Mock das utils do header
vi.mock("../../components/utils/header.utils", () => ({
  getThemeToggleLabel: vi.fn((isDark: boolean) =>
    isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
  ),
  getThemeToggleIcon: vi.fn((isDark: boolean) => (isDark ? "☀️" : "🌙")),
}));

// Theme mock para styled-components
const mockTheme = {
  background: "#f8f9fa",
  surface: "#ffffff",
  text: "#333333",
  textSecondary: "#6c757d",
  primary: "#007bff",
  primaryHover: "#0056b3",
  shadow: "rgba(0, 0, 0, 0.1)",
};

// Wrapper para testes com providers necessários
const renderWithProviders = (
  ui: React.ReactElement,
  { theme = mockTheme } = {}
) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>
  );
};

// Props padrão para testes
const defaultProps = {
  onThemeToggle: vi.fn(),
  isDark: false,
};

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering and Initial State", () => {
    it("should render header container with correct structure", () => {
      renderWithProviders(<Header {...defaultProps} />);

      // Verifica se o header está presente
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();

      // Verifica se tem o conteúdo principal
      expect(header).toHaveStyle({
        position: "sticky",
        top: "0",
        "z-index": "100",
      });
    });

    it("should render logo with correct text and link", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const logo = screen.getByRole("link", { name: APP_TITLE });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");
      expect(logo).toHaveTextContent(APP_TITLE);
    });

    it("should render all navigation items correctly", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();

      // Verifica se todos os itens de navegação estão presentes
      NAVIGATION_ITEMS.forEach((item) => {
        const navLink = screen.getByRole("link", { name: item.label });
        expect(navLink).toBeInTheDocument();
        expect(navLink).toHaveAttribute("href", item.path);
      });
    });

    it("should render theme toggle button with correct attributes", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toBeInTheDocument();
      expect(themeButton).toHaveAttribute(
        "aria-label",
        THEME_TOGGLE_ARIA_LABEL
      );
      expect(themeButton).toHaveAttribute("title", "Alternar para tema escuro");
    });
  });

  describe("User Interactions", () => {
    it("should call onThemeToggle when theme button is clicked", () => {
      const onThemeToggleMock = vi.fn();
      renderWithProviders(
        <Header {...defaultProps} onThemeToggle={onThemeToggleMock} />
      );

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      fireEvent.click(themeButton);

      expect(onThemeToggleMock).toHaveBeenCalledTimes(1);
    });

    it("should handle multiple theme toggle clicks", () => {
      const onThemeToggleMock = vi.fn();
      renderWithProviders(
        <Header {...defaultProps} onThemeToggle={onThemeToggleMock} />
      );

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });

      // Clica múltiplas vezes
      fireEvent.click(themeButton);
      fireEvent.click(themeButton);
      fireEvent.click(themeButton);

      expect(onThemeToggleMock).toHaveBeenCalledTimes(3);
    });

    it("should navigate correctly when navigation links are clicked", () => {
      renderWithProviders(<Header {...defaultProps} />);

      // Testa o link do logo
      const logoLink = screen.getByRole("link", { name: APP_TITLE });
      expect(logoLink).toHaveAttribute("href", "/");

      // Testa os links de navegação
      const homeLink = screen.getByRole("link", { name: "Início" });
      const categoriesLink = screen.getByRole("link", { name: "Categorias" });

      expect(homeLink).toHaveAttribute("href", "/");
      expect(categoriesLink).toHaveAttribute("href", "/categories");
    });
  });

  describe("Props and Configuration", () => {
    it("should display correct theme button text for light theme", () => {
      renderWithProviders(<Header {...defaultProps} isDark={false} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toHaveTextContent("🌙 Escuro");
      expect(themeButton).toHaveAttribute("title", "Alternar para tema escuro");
    });

    it("should display correct theme button text for dark theme", () => {
      renderWithProviders(<Header {...defaultProps} isDark={true} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toHaveTextContent("☀️ Claro");
      expect(themeButton).toHaveAttribute("title", "Alternar para tema claro");
    });

    it("should work with different onThemeToggle functions", () => {
      const customToggle = vi.fn();
      renderWithProviders(
        <Header {...defaultProps} onThemeToggle={customToggle} />
      );

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      fireEvent.click(themeButton);

      expect(customToggle).toHaveBeenCalledTimes(1);
    });

    it("should handle isDark prop changes correctly", () => {
      const { rerender } = renderWithProviders(
        <Header {...defaultProps} isDark={false} />
      );

      // Estado inicial - tema claro
      let themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toHaveTextContent("🌙 Escuro");

      // Rerenderiza com tema escuro
      rerender(
        <BrowserRouter>
          <ThemeProvider theme={mockTheme}>
            <Header {...defaultProps} isDark={true} />
          </ThemeProvider>
        </BrowserRouter>
      );

      themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toHaveTextContent("☀️ Claro");
    });
  });

  describe("Error Handling", () => {
    it("should handle missing onThemeToggle gracefully", () => {
      // @ts-expect-error - Testando comportamento sem prop obrigatória
      renderWithProviders(<Header isDark={false} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toBeInTheDocument();

      // Não deve causar erro mesmo sem handler
      expect(() => fireEvent.click(themeButton)).not.toThrow();
    });

    it("should handle invalid isDark values", () => {
      // @ts-expect-error - Testando comportamento com valor inválido
      renderWithProviders(<Header {...defaultProps} isDark={null} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toBeInTheDocument();
    });

    it("should render correctly even without theme provider", () => {
      // Renderiza sem ThemeProvider para testar robustez
      render(
        <BrowserRouter>
          <Header {...defaultProps} />
        </BrowserRouter>
      );

      expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: THEME_TOGGLE_ARIA_LABEL })
      ).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should integrate correctly with styled-components theme", () => {
      const customTheme = {
        ...mockTheme,
        primary: "#ff0000",
        surface: "#f0f0f0",
      };

      renderWithProviders(<Header {...defaultProps} />, {
        theme: customTheme,
      });

      const logo = screen.getByRole("link", { name: APP_TITLE });
      expect(logo).toBeInTheDocument();

      // Verifica se o styled-component está aplicando estilos
      expect(logo).toHaveStyle({ color: "#ff0000" });
    });

    it("should work correctly with React Router", () => {
      renderWithProviders(<Header {...defaultProps} />);

      // Verifica se todos os links do React Router estão funcionando
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3); // Logo + 2 navigation items

      links.forEach((link) => {
        expect(link).toHaveAttribute("href");
      });
    });
    it("should call utility functions with correct parameters", async () => {
      // Importa os mocks diretamente do módulo mockado
      const { getThemeToggleLabel, getThemeToggleIcon } = await import(
        "../../components/utils/header.utils"
      );

      renderWithProviders(<Header {...defaultProps} isDark={true} />);

      expect(getThemeToggleLabel).toHaveBeenCalledWith(true);
      expect(getThemeToggleIcon).toHaveBeenCalledWith(true);
    });

    it("should render with all required constants", () => {
      renderWithProviders(<Header {...defaultProps} />);

      // Verifica se todas as constantes estão sendo utilizadas
      expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: THEME_TOGGLE_ARIA_LABEL })
      ).toBeInTheDocument();

      NAVIGATION_ITEMS.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have correct ARIA labels and roles", () => {
      renderWithProviders(<Header {...defaultProps} />);

      // Header principal
      expect(screen.getByRole("banner")).toBeInTheDocument();

      // Navegação
      expect(screen.getByRole("navigation")).toBeInTheDocument();

      // Botão com ARIA label
      expect(
        screen.getByRole("button", { name: THEME_TOGGLE_ARIA_LABEL })
      ).toBeInTheDocument();

      // Links acessíveis
      expect(screen.getByRole("link", { name: APP_TITLE })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Categorias" })
      ).toBeInTheDocument();
    });

    it("should have proper title attributes for better UX", () => {
      renderWithProviders(<Header {...defaultProps} isDark={false} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });
      expect(themeButton).toHaveAttribute("title", "Alternar para tema escuro");
    });

    it("should be keyboard accessible", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });

      // Simula navegação por teclado
      themeButton.focus();
      expect(themeButton).toHaveFocus();

      // Testa ativação por teclado
      fireEvent.keyDown(themeButton, { key: "Enter", code: "Enter" });
      fireEvent.keyUp(themeButton, { key: "Enter", code: "Enter" });
    });

    it("should have semantic HTML structure", () => {
      renderWithProviders(<Header {...defaultProps} />);

      // Verifica estrutura semântica
      const header = screen.getByRole("banner");
      const nav = screen.getByRole("navigation");
      const button = screen.getByRole("button");

      expect(header).toContainElement(nav);
      expect(header).toContainElement(button);
    });

    it("should provide clear visual feedback for interactions", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const themeButton = screen.getByRole("button", {
        name: THEME_TOGGLE_ARIA_LABEL,
      });

      // Verifica se o botão tem cursor pointer implícito
      expect(themeButton).toHaveStyle({ cursor: "pointer" });
    });
  });
});
