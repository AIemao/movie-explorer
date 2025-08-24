import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.surface};
  box-shadow: 0 2px 10px ${({ theme }) => theme.shadow};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary}20;
  }
`;

const ThemeToggle = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

interface HeaderProps {
  onThemeToggle: () => void;
  isDark: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDark }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">🎬 Movie Explorer</Logo>
        <Nav>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/categories">Categorias</NavLink>
        </Nav>
        <ThemeToggle onClick={onThemeToggle}>
          {isDark ? "☀️ Claro" : "🌙 Escuro"}
        </ThemeToggle>
      </HeaderContent>
    </HeaderContainer>
  );
};
