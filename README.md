# 🎬 Movie Explorer

Um aplicativo simples para explorar filmes em cartaz usando a API do TMDb (The Movie Database), desenvolvido para estudos de testes unitários e E2E.

## 🚀 Funcionalidades

- ✅ Exibir filmes em cartaz
- ✅ Ver detalhes completos dos filmes
- ✅ Navegar por categorias/gêneros clicáveis
- ✅ Filtrar filmes por gênero específico
- ✅ Tema claro/escuro
- ✅ Design responsivo (5 colunas em desktop)
- ✅ Carregamento paginado
- ✅ Animações suaves e efeitos visuais
- ✅ Cards com hover effects e fade-in das imagens

## 🛠️ Tecnologias

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **React Router** para navegação
- **Styled Components** para estilização
- **Axios** para requisições HTTP
- **TMDb API** para dados dos filmes
- **Vitest** para testes (configurado)

## 📋 Pré-requisitos

1. Node.js (versão 16+)
2. Chave da API do TMDb

### Obtendo a chave da API

1. Registre-se em [TMDb](https://www.themoviedb.org/)
2. Vá para as configurações da sua conta
3. Acesse a seção "API"
4. Copie sua chave da API v3 (Bearer Token)

## 🔧 Instalação e Configuração

1. **Clone e instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure a chave da API:**

   - Copie o arquivo `.env.example` para `.env`
   - Substitua `sua_chave_da_api_aqui` pela sua chave real do TMDb (Bearer Token)

3. **Execute o projeto:**

   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   ```
   http://localhost:5173
   ```

## 📁 Estrutura do Projeto

```
src/
├── api/
│   └── tmdb.ts           # Configuração da API e tipos
├── components/
│   ├── Header.tsx        # Cabeçalho com navegação
│   ├── MovieCard.tsx     # Card de filme com animações
│   ├── MovieDetails.tsx  # Detalhes do filme
│   └── CategoryList.tsx  # Lista de categorias
├── pages/
│   ├── Home.tsx          # Página inicial
│   ├── MoviePage.tsx     # Página de detalhes
│   ├── GenrePage.tsx     # Página de filmes por gênero
│   └── CategoriesPage.tsx # Página de categorias
├── styles/
│   └── GlobalStyles.ts   # Estilos globais e temas
└── App.tsx               # Componente principal
```

## 🧪 Ideal para Testes

Este projeto foi desenvolvido com foco na simplicidade para facilitar o aprendizado de testes:

### Testes Unitários

- Componentes isolados com props bem definidas
- Lógica de API separada em serviços
- Estados simples e previsíveis
- Data-testid em elementos importantes

### Testes E2E

- Fluxos de navegação claros
- Carregamento de dados da API
- Interações de usuário (cliques, navegação)
- Alternância de temas

## 🎯 Cenários de Teste Sugeridos

### Unitários

- ✅ Renderização de componentes
- ✅ Formatação de dados (datas, ratings)
- ✅ Manipulação de estados
- ✅ Chamadas de API (mocks)

### E2E

- ✅ Carregamento da página inicial
- ✅ Navegação entre páginas
- ✅ Visualização de detalhes do filme
- ✅ Filtros por categoria
- ✅ Cliques em tags de gênero
- ✅ Alternância de tema

## 🌐 API Endpoints Utilizados

- `GET /movie/now_playing` - Filmes em cartaz
- `GET /movie/{id}` - Detalhes do filme
- `GET /genre/movie/list` - Lista de gêneros
- `GET /discover/movie` - Descobrir filmes por gênero

## 📝 Scripts Disponíveis

```bash
npm run dev      # Executa em modo de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build de produção
npm run lint     # Executa linting
npm run test     # Executa testes com Vitest (quando configurado)
```

## 🔍 Próximos Passos para Testes

1. ✅ Vitest configurado para testes unitários
2. Configurar Playwright ou Cypress para testes E2E
3. Implementar mocks para a API do TMDb
4. Criar cenários de teste para diferentes estados de loading/error
5. Testar responsividade e acessibilidade

## ✨ Funcionalidades Implementadas

### 🎯 Navegação por Gêneros

- Tags de gênero clicáveis na página de detalhes
- Página dedicada para filmes filtrados por gênero
- Layout responsivo com 5 colunas em desktop

### 🎨 Interface Moderna

- Cards com animações suaves ao carregar
- Efeitos de hover elegantes
- Loading skeletons animados
- Transições fluidas entre páginas

### 📱 Design Responsivo

- Desktop: 5 colunas
- Tablet: 4 colunas
- Mobile: 2 colunas
- Adaptação automática do layout

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça fork deste repositório
2. Conecte sua conta Vercel ao GitHub
3. Importe o projeto no Vercel
4. Adicione as variáveis de ambiente:
   - `VITE_TMDB_API_KEY`: Sua chave Bearer da TMDb
   - `VITE_TMDB_BASE_URL`: https://api.themoviedb.org/3
   - `VITE_TMDB_IMAGE_BASE_URL`: https://image.tmdb.org/t/p/w500

### Netlify

1. Faça build do projeto: `npm run build`
2. Faça upload da pasta `dist/` no Netlify
3. Configure as variáveis de ambiente no painel do Netlify

## 🧭 Fluxo de Navegação do Site

Página Inicial (Home):

Exibir lista de filmes em cartaz com cartaz, título e data de lançamento.

Ao clicar em um filme, redirecionar para a página de detalhes.

Página de Detalhes do Filme:

Exibir informações completas do filme, incluindo sinopse, elenco, trailers e listas às quais pertence.

Menu de Navegação:

Incluir categorias como "Em Cartaz", "Top Bilheteira", "Mais Populares", "Em Breve", "Top Avaliados".

Permitir alternar entre temas claro e escuro.
