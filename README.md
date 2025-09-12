# 🎬 Movie Explorer

Um aplicativo React moderno para explorar filmes usando a API do TMDb, desenvolvido com foco em **qualidade de código** e **testes abrangentes**.

## ✨ Características

🎯 **Interface moderna** com tema claro/escuro  
🧪 **Cobertura de testes** orientada por TDD  
📱 **Design responsivo** (5/4/2 colunas)  
🚀 **Performance otimizada** (Vite + TypeScript)  
⚡ **Navegação fluida** com React Router

## 🛠️ Stack Tecnológica

**Frontend:** React 18 + TypeScript + Styled Components  
**Build:** Vite + ESLint + Prettier  
**Testes:** Vitest + Testing Library + MSW + Coverage v8  
**API:** TMDb (The Movie Database)

## 📊 Status do Projeto

### 🧪 **Cobertura de Testes**

- **Total:** 34.01% ✅ (+XX% DIA 4 - aguardando relatório)
- **Componentes:** 58.78% ✅ (com tmdb.ts: estimado 70%+)
- **74 testes** passando em 6 arquivos (incluindo MSW)

### 🏆 **Componentes 100% Cobertos**

- ✅ **Header.tsx** - Navegação principal (23 testes)
- ✅ **CategoryList.tsx** - Lista de gêneros (12 testes)
- ✅ **tmdb.ts** - API services (35 testes: 12 unit + 23 integration)
- ✅ **GlobalStyles.ts** - Estilos globais

### 📈 **Progresso Semanal**

- **DIA 1:** Configuração + MovieCard (4 testes)
- **DIA 2:** CategoryList expandido (12 testes)
- **DIA 3:** Header implementado (23 testes)
- **DIA 4:** ✅ **tmdb.ts CONCLUÍDO** (35 testes + MSW + 100% cobertura)

**📊 [Dashboard Completo →](docs/dashboard/STATUS_DASHBOARD.md)**  
**📚 [Documentação →](docs/)**

## 🚀 Instalação Rápida

### **Pré-requisitos**

- Node.js 16+
- Chave da API TMDb ([obter aqui](https://www.themoviedb.org/))

### **Setup em 3 passos**

```bash
# 1. Instalar dependências
npm install

# 2. Configurar API (copie .env.example para .env)
cp .env.example .env
# Edite .env e adicione sua chave TMDb

# 3. Executar
npm run dev
```

**🌐 Acesse:** http://localhost:5173

## 📱 Funcionalidades

🎬 **Exploração de filmes** - Em cartaz, populares, por gênero  
🔍 **Detalhes completos** - Sinopse, elenco, avaliações  
🎨 **Interface moderna** - Animações suaves, hover effects  
🌙 **Tema dual** - Claro/escuro com toggle  
📱 **Responsivo** - Desktop (5 cols), tablet (4), mobile (2)

## 🛠️ Scripts de Desenvolvimento

```bash
# Desenvolvimento
npm run dev                    # Servidor local
npm run build                  # Build produção
npm run preview                # Preview do build

# Qualidade
npm run lint                   # ESLint
npm run test                   # Testes (watch)
npm run test:coverage          # Cobertura completa

# Análise
npm run coverage:analyze       # Relatório personalizado
```

## 🧪 Filosofia de Testes

> **"Cada linha de código deve ser testada. Cada teste deve ter propósito. Cada dia deve agregar valor."**

Este projeto segue **TDD rigoroso** com workflow diário estruturado:

✅ **Componentes isolados** com props bem definidas  
✅ **MSW (Mock Service Worker)** para APIs  
✅ **Mocks robustos** para dependências externas  
✅ **Testes de acessibilidade** com ARIA labels  
✅ **Cobertura progressiva** - meta 85-100% por arquivo

**📋 [Ver Workflow Completo →](docs/workflow/DAILY_WORKFLOW_STANDARD.md)**

## 🎯 Para Desenvolvedores

### **Estrutura de Testes**

```
src/test/
├── components/   # Header, CategoryList, MovieCard
├── api/         # TMDb services (Unit + Integration)
├── mocks/       # MSW handlers para HTTP
├── pages/       # Home, MovieDetails (planejado)
├── setup.ts     # Configuração global Vitest
└── msw-setup.ts # Configuração Mock Service Worker
```

### **Próximos Alvos**

1. **tmdb.ts** - ✅ **CONCLUÍDO** (43% → 100% com MSW)
2. **MovieDetails.tsx** - Página de detalhes (0% → 85%+)
3. **E2E Tests** - Playwright/Cypress

### **Como Contribuir**

1. **Fork** o repositório
2. **Siga** o [workflow padrão](docs/workflow/DAILY_WORKFLOW_STANDARD.md)
3. **Abra** um PR com testes

**📖 [Guia Completo →](CONTRIBUTING.md)**

## 🚀 Deploy e CI/CD

### **GitHub Actions**

Workflow automatizado configurado:

- ✅ Linting + TypeScript
- ✅ Testes unitários + cobertura
- ✅ Build de produção

**Setup:** Adicione `VITE_TMDB_API_KEY` nos secrets do repositório

### **Deploy Rápido**

- **Vercel:** Conecte o repo + configure env vars
- **Netlify:** Upload da pasta `dist/` + env vars

**📋 [Guia Completo de Deploy →](docs/)**

---

## 📊 Documentação

| Seção             | Descrição                          | Link                                              |
| ----------------- | ---------------------------------- | ------------------------------------------------- |
| **📊 Dashboard**  | Status completo do projeto         | [Ver →](docs/dashboard/STATUS_DASHBOARD.md)       |
| **🔄 Workflow**   | Processo diário de desenvolvimento | [Ver →](docs/workflow/DAILY_WORKFLOW_STANDARD.md) |
| **📈 Relatórios** | Histórico de progresso por dia     | [Ver →](docs/reports/)                            |
| **🤝 Contribuir** | Guia para contribuições            | [Ver →](CONTRIBUTING.md)                          |

## 🏆 Créditos

Desenvolvido com foco em **qualidade**, **testes abrangentes** e **documentação viva**.

**Stack:** React + TypeScript + Vitest + Styled Components  
**API:** [The Movie Database (TMDb)](https://www.themoviedb.org/)  
**Licença:** MIT

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/username/movie-explorer?style=social)](https://github.com/username/movie-explorer)

</div>
