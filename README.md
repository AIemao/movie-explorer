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
npm run dev                    # Executa em modo de desenvolvimento
npm run build                  # Gera build de produção
npm run preview                # Visualiza build de produção
npm run lint                   # Executa linting
npm run test                   # Executa todos os testes (modo watch)
npm run test:run               # Executa testes uma vez e finaliza
npm run test:watch             # Executa testes em modo watch (explícito)
npm run test:ui                # Interface visual para testes
npm run test:coverage          # Executa testes com cobertura (single run)
npm run test:coverage:watch    # Executa testes com cobertura em modo watch
npm run test:coverage:summary  # Executa cobertura + análise personalizada
npm run coverage:analyze       # Ver apenas o resumo personalizado de cobertura
```

## 📊 Análise de Cobertura Personalizada

Este projeto inclui um script personalizado de análise de cobertura que fornece insights detalhados sobre o estado dos testes:

### 🎯 Funcionalidades da Análise

- **📊 Estatísticas abrangentes:** Total de arquivos, percentual com/sem testes, cobertura geral
- **🌟 Categorização inteligente:** Divide arquivos em boa cobertura (≥80%), parcial (<80%) e sem cobertura
- **📁 Análise por arquivo:** Mostra cobertura individual de cada arquivo do projeto
- **⚡ Comandos úteis:** Lista todos os comandos disponíveis para desenvolvimento
- **🎯 Orientações práticas:** Sugere próximos passos e estrutura para novos testes

### 🖥️ Exemplo de Saída

```
🎯 RESUMO PERSONALIZADO DE COBERTURA
==========================================
📊 Total de arquivos analisados: 12
✅ Arquivos com testes: 3 (25.0%)
❌ Arquivos sem testes: 9 (75.0%)
📈 Cobertura geral: 19.89%
📝 Total de linhas: 704 (140 cobertas)

🌟 Arquivos com boa cobertura (≥80%):
   ✅ src/styles/GlobalStyles.ts - 100.0%
   ✅ src/components/MovieCard.tsx - 95.5%

⚡ Arquivos com cobertura parcial (<80%):
   🔶 src/api/tmdb.ts - 43.4%

🔴 Arquivos sem cobertura:
   ❌ src/App.tsx - 0%
   ❌ src/components/Header.tsx - 0%
   [...]

🎯 Para criar novos testes:
   • Componentes: src/test/components/[NomeComponente].test.tsx
   • Pages: src/test/pages/[NomePage].test.tsx
   • API: src/test/api/[nomeService].test.ts
   • Utils: src/test/utils/[nomeUtil].test.ts
```

### 📋 Estrutura de Testes

```
src/test/
├── setup.ts              # Configuração do ambiente de testes
├── components/            # Testes de componentes React
│   └── MovieCard.test.tsx
├── api/                   # Testes de serviços de API
│   └── tmdb.test.ts
├── pages/                 # Testes de páginas (a implementar)
└── utils/                 # Testes de utilitários (a implementar)
```

## 🔍 Status dos Testes

### ✅ Implementado

- ✅ Vitest configurado para testes unitários
- ✅ Ambiente de teste configurado com DOM testing
- ✅ Testes do componente MovieCard (95.5% de cobertura)
- ✅ Testes básicos da API TMDb (43.4% de cobertura)
- ✅ Script personalizado de análise de cobertura
- ✅ GlobalStyles com 100% de cobertura

### 🚧 Próximos Passos

1. Configurar Playwright ou Cypress para testes E2E
2. Implementar testes para componentes Header, MovieDetails
3. Criar testes para páginas Home, GenrePage
4. Melhorar cobertura dos serviços de API
5. Implementar mocks mais robustos para diferentes cenários
6. Testar responsividade e acessibilidade

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

### GitHub Actions (CI/CD)

Este projeto inclui um workflow do GitHub Actions configurado. Para que os testes passem no CI:

1. **Fork este repositório**
2. **Configure o secret no seu repositório:**

   - Vá para `Settings > Secrets and Variables > Actions`
   - Adicione um novo **Repository Secret** chamado `VITE_TMDB_API_KEY`
   - Cole sua chave da API TMDb (Bearer Token)

   > ⚡ As outras variáveis (`VITE_TMDB_BASE_URL` e `VITE_TMDB_IMAGE_BASE_URL`) já estão configuradas automaticamente no workflow.

3. **O workflow executará automaticamente:**
   - ✅ Linting com ESLint
   - ✅ Verificação de tipos TypeScript
   - ✅ Testes unitários com cobertura
   - ✅ Build de produção

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
