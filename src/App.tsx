import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Header } from "./components/Header";
import { CategoriesPage } from "./pages/CategoriesPage";
import { GenrePage } from "./pages/GenrePage";
import { Home } from "./pages/Home";
import { MoviePage } from "./pages/MoviePage";
import { GlobalStyles, theme } from "./styles/GlobalStyles";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Router>
        <Header onThemeToggle={toggleTheme} isDark={isDark} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/genre/:genreId/:genreName" element={<GenrePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
