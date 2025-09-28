# 🤖 AI CONTEXT RECOVERY - MOVIE EXPLORER

> **📁 LOCALIZAÇÃO:** Este arquivo está em `docs/AI_CONTEXT_RECOVERY.md` junto com toda a documentação do projeto.

## 📚 **CONTEXTO EDUCACIONAL**

**⚠️ IMPORTANTE:** Este é um **projeto de estudos** focado exclusivamente no **aprendizado de testes unitários e boas práticas de desenvolvimento**. O objetivo é explorar e aplicar as melhores técnicas de **Test-Driven Development (TDD)**, **Mock Service Worker (MSW)**, **Testing Library**, e **padrões profissionais de qualidade de código**.

**🎯 Foco educacional:**

- ✅ **Estruturas de teste** modernas e eficientes
- ✅ **Mocks e stubs** para diferentes cenários
- ✅ **Cobertura de código** significativa (85-100%)
- ✅ **CI/CD pipelines** automatizados
- ✅ **Documentação técnica** detalhada
- ✅ **Workflow padrão** para desenvolvimento orientado por testes

---

## 🎯 **INSTRUÇÕES PARA IA ASSISTENTE**

Você acaba de ser chamado para continuar o desenvolvimento do **Movie Explorer**, um projeto React + TypeScript focado em **desenvolvimento orientado por testes (TDD)**. Este documento contém TODAS as informações necessárias para continuar de onde paramos.

### **🚨 PRIMEIRA AÇÃO OBRIGATÓRIA:**

1. **Leia imediatamente:** `dashboard/STATUS_DASHBOARD.md` (estado atual completo)
2. **Leia imediatamente:** `workflow/DAILY_WORKFLOW_STANDARD.md` (processo obrigatório)
3. **Leia imediatamente:** `DOCS_STRUCTURE_GUIDE.md` (estrutura da documentação)
4. **Execute:** `npm run test:coverage` (para ver estado atual dos testes)

---

## 📊 **CONTEXTO ATUAL DO PROJETO - SETEMBRO 2025**

### **🚨 PRIMEIRA AÇÃO - VERIFICAR ESTADO ATUAL:**

**ANTES de fazer qualquer coisa, execute:**

1. **`npm run test:coverage`** - Para ver métricas atuais (esperado: 187 testes, 95.93% cobertura)
2. **Leia:** `dashboard/STATUS_DASHBOARD.md` - Estado completo atualizado (DIA 9)
3. **Leia:** `DOCS_STRUCTURE_GUIDE.md` - Estrutura da documentação
4. **Identifique:** Próximo alvo baseado na tabela "Próximos Alvos"

### **📊 ESTADO ATUAL (DIA 9 - Setembro 2025):**

```
✅ CONCLUÍDOS:
- DIA 1-8: MovieCard, CategoryList, Header, tmdb.ts, MovieDetails, Home, GenrePage, Utils Bundle
- DIA 9: App.tsx 100% cobertura (8 testes, integração total)
- Total: 187 testes passando em 10 arquivos
- Cobertura geral: 95.93% 🏆 NOVO RECORDE!
- Branch: feature/app-tests-dia9
```

### **🎯 COMO IDENTIFICAR PRÓXIMO ALVO:**

1. **Abra:** `dashboard/STATUS_DASHBOARD.md`
2. **Procure:** Seção "🎯 Próximos Alvos (DIA X-Y)"
3. **Escolha:** Primeiro arquivo da lista PRIORIDADE ALTA
4. **Confirme:** Meta de 85-100% cobertura para o arquivo

---

## 🔄 **DAILY_WORKFLOW_STANDARD (OBRIGATÓRIO)**

### **SEMPRE seguir estas 8 etapas rigorosamente:**

#### **1. 🧪 Bateria Inicial** (Validar estado)

```bash
npm run build          # Build produção
npm run lint            # ESLint
npm run test:coverage   # Todos os testes
npm run dev            # Servidor local
```

#### **2. 📊 Análise de Cobertura** (Identificar alvos)

```bash
npm run coverage:analyze  # Script personalizado
```

#### **3. 🎯 Priorização** (Escolher arquivo)

- Priorizar por: **impacto + complexidade + linhas de código**
- Meta: **85-100% cobertura por arquivo**

#### **4-5. 🔍 Git + Branch** (Isolar desenvolvimento)

```bash
git checkout main && git pull
git checkout -b feature/[component-name]-tests-dia[X]
```

#### **6. 💻 Desenvolvimento** (Implementar testes)

- Estrutura padrão: Rendering, Interactions, Props, Error Handling, Integration, Accessibility
- **MSW para APIs**, **mocks para React Router/styled-components**

#### **7. 🧪 Bateria Final** (Validar qualidade)

```bash
npm run build && npm run lint && npm run test:coverage
```

#### **8. 📝 Documentação + PR** (Finalizar)

- Commit + push + merge para main
- Atualizar `dashboard/STATUS_DASHBOARD.md`
- Criar `reports/daily/issue/RESUMO_EXECUTIVO_DIA[X].md`

---

## 📁 **ARQUIVOS CRÍTICOS - LER OBRIGATORIAMENTE**

### **🎯 Para entender o PROCESSO:**

1. **`workflow/DAILY_WORKFLOW_STANDARD.md`** - Processo completo de 8 etapas (ATUALIZADO: inclui sincronização README.md)
2. **`dashboard/STATUS_DASHBOARD.md`** - Estado atual, próximos alvos, métricas
3. **`DOCS_STRUCTURE_GUIDE.md`** - **NOVO!** Estrutura completa da documentação

### **🆕 NOVIDADES IMPORTANTES (Setembro 2025):**

- **DAILY_WORKFLOW_STANDARD atualizado** - ETAPA 8 agora inclui sincronização obrigatória do README.md
- **DOCS_STRUCTURE_GUIDE.md criado** - Mapa completo da documentação com responsabilidades claras
- **Padrão de relatórios estabelecido** - reports/daily/ com nomenclatura e conteúdo padronizados
- **Sincronização documentação** - README.md raiz deve sempre refletir STATUS_DASHBOARD.md

### **🎯 Para entender PADRÕES DE TESTE:**

4. **`../src/test/pages/GenrePage.test.tsx`** - **MAIS RECENTE** Exemplo completo (20 testes, DIA 7)
5. **`../src/test/pages/Home.test.tsx`** - Exemplo página com load more (21 testes, DIA 6)
6. **`../src/test/components/MovieDetails.test.tsx`** - Exemplo componente completo (20 testes)
7. **`../src/test/components/Header.test.tsx`** - Exemplo integração routing (23 testes)
8. **`../src/test/api/tmdb.integration.test.ts`** - Exemplo MSW integration (23 testes)

### **🎯 Para identificar PRÓXIMO ALVO:**

9. **`dashboard/STATUS_DASHBOARD.md`** - Tabela "Próximos Alvos" atualizada (DIA 8+)
10. **`../src/test/mocks/tmdb-handlers.ts`** - Handlers MSW configurados e testados

---

## 🧪 **PADRÕES DE TESTE ESTABELECIDOS**

### **Estrutura OBRIGATÓRIA:**

```typescript
describe("[ComponentName]", () => {
  describe("Rendering and Initial State", () => {
    it("should render loading spinner initially", () => {});
    it("should render component when data loads", () => {});
    // ...
  });

  describe("User Interactions", () => {
    it("should handle click events", () => {});
    it("should handle form submissions", () => {});
    // ...
  });

  describe("Props and Configuration", () => {});
  describe("Error Handling", () => {});
  describe("Integration", () => {});
  describe("Accessibility", () => {});
});
```

### **Mocks PADRONIZADOS:**

```typescript
// React Router
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: "123" }),
}));

// Styled Components
const mockTheme = {
  background: "#ffffff",
  surface: "#f5f5f5",
  text: "#333333",
  primary: "#007bff",
};

// MSW para APIs (já configurado)
// Usar handlers em ../src/test/mocks/tmdb-handlers.ts
```

---

## 🎯 **IDENTIFICAÇÃO DO PRÓXIMO ALVO**

### **📋 PROCESSO PARA IDENTIFICAR O ARQUIVO ALVO:**

1. **Abra:** `dashboard/STATUS_DASHBOARD.md`
2. **Localize:** Seção "🎯 Próximos Alvos (DIA X-Y)"
3. **Analise:** Tabela com arquivos priorizados por DIA
4. **Escolha:** Próximo arquivo da lista PRIORIDADE ALTA
5. **Leia:** O arquivo alvo para entender sua complexidade

### **🧪 ESTRUTURA DE TESTES ESPERADA (GENÉRICA):**

```typescript
describe("[ComponentName]", () => {
  describe("Rendering and Initial State", () => {
    // Estado inicial
    // Loading states
    // Renderização básica
  });

  describe("Data Loading and API Integration", () => {
    // Chamadas de API
    // Tratamento de dados
    // Estados de carregamento
  });

  describe("User Interactions", () => {
    // Cliques e eventos
    // Navegação
    // Formulários
  });

  describe("Error Handling", () => {
    // Falhas de API
    // Timeouts de rede
    // Estados de erro
  });

  describe("Integration", () => {
    // Integração com outros componentes
    // React Router
    // Context providers
  });

  describe("Accessibility", () => {
    // ARIA labels
    // Navegação por teclado
    // Screen readers
  });
});
```

---

## 🚨 **REGRAS CRÍTICAS**

### **❌ NUNCA FAZER:**

- Quebrar testes existentes (179 testes devem continuar passando)
- Ignorar warnings do ESLint
- Pular etapas do DAILY_WORKFLOW_STANDARD
- Fazer commit sem 85%+ cobertura no arquivo alvo
- Modificar arquivos sem criar testes primeiro
- Esquecer de atualizar README.md da raiz após implementação (ETAPA 8)

### **✅ SEMPRE FAZER:**

- Executar bateria completa ANTES e DEPOIS do desenvolvimento
- Seguir estrutura de testes estabelecida (6 categorias padrão)
- Usar MSW para testes de integração de API (já configurado e funcionando)
- Documentar todas as mudanças (relatórios diários + resumos executivos)
- Atualizar STATUS_DASHBOARD.md E README.md da raiz (sincronização obrigatória)
- Seguir padrões estabelecidos no DOCS_STRUCTURE_GUIDE.md

---

## 📊 **COMANDOS ESSENCIAIS**

### **Validação contínua:**

```bash
npm run test:coverage     # Ver cobertura atual
npm run coverage:analyze  # Análise detalhada
npm run build            # Testar build produção
npm run lint             # Validar qualidade
```

### **Desenvolvimento:**

```bash
npm run dev              # Servidor local (:5173)
npm run test             # Watch mode para desenvolvimento
npm run test:run         # Single run
```

### **Workflow git:**

```bash
git checkout main && git pull
git checkout -b feature/[component-name]-tests-dia[X]
# [desenvolvimento...]
git add . && git commit -m "feat: implementar testes [ComponentName] - DIA [X]"
git push origin feature/[component-name]-tests-dia[X]
# [merge para main]
```

---

## 📋 **CHECKLIST DE INICIALIZAÇÃO**

### **ANTES de começar qualquer desenvolvimento:**

- [ ] **Li** `dashboard/STATUS_DASHBOARD.md` completo
- [ ] **Li** `workflow/DAILY_WORKFLOW_STANDARD.md` completo (ETAPA 8 atualizada)
- [ ] **Li** `DOCS_STRUCTURE_GUIDE.md` completo (nova estrutura)
- [ ] **Executei** `npm run test:coverage` (esperado: 187 testes, 95.93% cobertura)
- [ ] **Confirmei** todos os testes passando em 10 arquivos
- [ ] **Identifiquei** próximo arquivo alvo no STATUS_DASHBOARD.md
- [ ] **Verifiquei** exemplos mais recentes: GenrePage.test.tsx (DIA 7) e Home.test.tsx (DIA 6)
- [ ] **Confirmei** que estou na branch `main` e atualizada

### **PRIMEIRA PERGUNTA ESPERADA:**

_"Vou iniciar o próximo DIA seguindo o DAILY_WORKFLOW_STANDARD. Executando ETAPA 1 - Bateria de Testes Inicial. O projeto está no estado correto para continuar?"_

---

## 🎯 **OBJETIVO FINAL**

Manter a **excelência em qualidade** já estabelecida:

- **100% dos testes passando** sempre
- **85-100% cobertura** por arquivo implementado
- **Documentação viva** atualizada
- **Padrões profissionais** de desenvolvimento

### **Meta do projeto:**

- **95%+ cobertura geral** (atual: 95.93%, meta 90%+ já atingida!)
- **Todos os componentes críticos** com testes abrangentes (✅ CONCLUÍDO)
- **Todas as páginas principais** com testes completos (Home ✅, GenrePage ✅)
- **CI/CD funcionando** (GitHub Actions)
- **Documentação estruturada** e mantida sempre atualizada
- **Base sólida** para E2E tests futuros

---

## 🌟 **FILOSOFIA**

> **"Cada linha de código deve ser testada. Cada teste deve ter propósito. Cada dia deve agregar valor."**

### **Princípios inegociáveis:**

- ✅ **Qualidade primeiro** - Testes antes de features
- ✅ **Incremento diário** - Um arquivo/componente por dia
- ✅ **Validação contínua** - Bateria completa a cada ciclo
- ✅ **Documentação viva** - Registro de cada decisão

---

## 🚀 **INICIALIZAÇÃO**

### **Para começar AGORA:**

1. **Execute:** `npm run test:coverage` (esperado: 187 testes, 95.93% cobertura)
2. **Confirme:** Todos os testes passando (deve mostrar 10 arquivos)
3. **Leia:** `dashboard/STATUS_DASHBOARD.md` (DIA 9 completo, próximos alvos)
4. **Leia:** `DOCS_STRUCTURE_GUIDE.md` (nova estrutura documentação)
5. **Siga:** DAILY_WORKFLOW_STANDARD com ETAPA 8 atualizada
6. **Pergunte:** "Pronto para iniciar DIA 10 ou finalizar documentação DIA 9?"

---

**🎬 PROJETO MOVIE EXPLORER - DESENVOLVIMENTO ORIENTADO POR TESTES**  
**📊 STATUS ATUAL: DIA 9 COMPLETO - 187 TESTES - 95.93% COBERTURA**  
**🎯 MARCO: 95%+ COBERTURA GERAL ATINGIDA!**  
**📚 DOCUMENTAÇÃO: ESTRUTURADA E SINCRONIZADA**

**EXCELÊNCIA MANTIDA - CONTINUE O MOMENTUM!** 🚀
