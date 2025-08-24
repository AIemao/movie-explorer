import React from "react";
import { CategoryList } from "../components/CategoryList";
import { Container } from "../styles/GlobalStyles";

export const CategoriesPage: React.FC = () => {
  return (
    <Container>
      <CategoryList />
    </Container>
  );
};
