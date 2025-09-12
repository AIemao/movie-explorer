# 📋 Workflow Padrão - Desenvolvimento Orientado por Testes

Este documento define o processo padrão para desenvolvimento diário orientado por testes no projeto Movie Explorer.

---

## 🎯 **Filosofia do Workflow**

**Objetivo:** Garantir alta qualidade de código através de desenvolvimento incremental orientado por testes, com validação contínua e documentação completa.

**Princípios:**

- ✅ **Qualidade primeiro:** Testes antes de features
- ✅ **Incremento diário:** Um arquivo/componente por dia
- ✅ **Validação contínua:** Bateria completa a cada ciclo
- ✅ **Documentação viva:** Registro de cada decisão e resultado

---

## 🔄 **Processo Diário Padrão (8 Etapas)**

### **1. 🧪 Bateria de Testes Inicial**

**Objetivo:** Validar estado atual do projeto

```bash
# Sequência obrigatória de validação
npm run build          # Verificar se produção funciona
npm run lint            # Validar qualidade do código
npm run test:coverage   # Executar todos os testes
npm run preview         # Testar preview do build
npm run dev             # Verificar desenvolvimento
```

**Critérios de Sucesso:**

- [ ] Build executado sem erros
- [ ] Linting sem warnings
- [ ] Todos os testes passando
- [ ] Preview funcionando
- [ ] Dev server iniciando rapidamente

### **2. 📊 Análise de Cobertura**

**Objetivo:** Identificar próximos alvos para testes

```bash
npm run coverage:analyze  # Script personalizado de análise
```

**Ações:**

- [ ] Revisar relatório de cobertura
- [ ] Identificar arquivos sem cobertura
- [ ] Listar arquivos com cobertura parcial
- [ ] Documentar estado atual

### **3. 🎯 Priorização de Arquivos**

**Objetivo:** Escolher o próximo alvo baseado em critérios objetivos

**Critérios de Priorização (ordem):**

1. **Impacto:** Crítico > Alto > Médio > Baixo
2. **Complexidade:** Baixa > Média > Alta
3. **Responsabilidade:** Core > UI > Utils > Pages
4. **Dependencies:** Poucos dependentes > Muitos dependentes

**Matriz de Priorização:**

```
PRIORIDADE ALTA:    Alto Impacto + Baixa Complexidade
PRIORIDADE MÉDIA:   Alto Impacto + Média Complexidade
PRIORIDADE BAIXA:   Médio/Baixo Impacto + Qualquer Complexidade
```

### **4. 🔍 Verificação Git/Branch**

**Objetivo:** Garantir ambiente limpo para desenvolvimento

```bash
git status              # Verificar modificações pendentes
git log --oneline -5    # Verificar últimos commits
git branch -a           # Listar todas as branches
```

**Checklist:**

- [ ] Branch main limpa (sem modificações)
- [ ] Último commit validado
- [ ] Nenhum PR pendente de merge
- [ ] Sem conflitos conhecidos

### **5. 🌿 Criação de Nova Branch**

**Objetivo:** Isolar desenvolvimento do arquivo alvo

**Padrão de nomenclatura:**

```bash
feature/[component-name]-tests
feature/[service-name]-tests
feature/[page-name]-tests
feature/[utility-name]-tests
```

**Exemplos:**

```bash
git checkout -b feature/header-tests
git checkout -b feature/tmdb-api-tests
git checkout -b feature/movie-details-tests
git checkout -b feature/genre-page-tests
```

### **6. 💻 Desenvolvimento**

**Objetivo:** Implementar testes abrangentes para o arquivo alvo

**Estrutura de Testes Padrão:**

```javascript
describe("[ComponentName]", () => {
  describe("Rendering and Initial State", () => {
    // Testes de renderização básica
  });

  describe("User Interactions", () => {
    // Testes de interação do usuário
  });

  describe("Props and Configuration", () => {
    // Testes de propriedades e configuração
  });

  describe("Error Handling", () => {
    // Testes de tratamento de erro
  });

  describe("Integration", () => {
    // Testes de integração com outros componentes
  });

  describe("Accessibility", () => {
    // Testes de acessibilidade
  });
});
```

**Meta de Cobertura por Arquivo:**

- **Componentes:** ≥ 95%
- **Serviços:** ≥ 90%
- **Utilities:** ≥ 95%
- **Pages:** ≥ 85%

### **7. 🧪 Bateria de Testes Final**

**Objetivo:** Validar que as mudanças não quebram nada

```bash
# Mesma sequência da bateria inicial
npm run build
npm run lint
npm run test:coverage
npm run preview
npm run dev
```

**Validações Adicionais:**

- [ ] Novos testes passando
- [ ] Testes existentes ainda funcionando
- [ ] Cobertura do arquivo alvo atingida
- [ ] Performance mantida ou melhorada

### **8. 📝 Documentação e PR**

**Objetivo:** Documentar mudanças e solicitar revisão

**A. Gerar Comentários para PR:**

```markdown
## 🎯 Objetivo

Implementar testes abrangentes para [NomeDoArquivo]

## ✅ Testes Implementados

- [ ] Renderização e Estado Inicial (X testes)
- [ ] Interações do Usuário (X testes)
- [ ] Props e Configuração (X testes)
- [ ] Tratamento de Erros (X testes)
- [ ] Integração (X testes)
- [ ] Acessibilidade (X testes)

## 📊 Cobertura Alcançada

- **Statements:** X%
- **Branches:** X%
- **Functions:** X%
- **Lines:** X%

## 🧪 Validação

- [x] Todos os testes passando
- [x] Build funcionando
- [x] Linting limpo
- [x] Performance mantida
```

**B. Criar Resumo Executivo (se aplicável):**

Para tasks/issues importantes, criar resumo executivo:

```bash
# Criar arquivo em docs/reports/daily/issue/
# Seguir template em docs/reports/daily/issue/README.md
```

**C. Enviar PR:**

```bash
git add .
git commit -m "feat(tests): Implementar testes para [NomeDoArquivo] com X% de cobertura"
git push origin feature/[nome-da-branch]
```

**D. Avaliar e Mergear:**

- [ ] Revisão automática (CI/CD)
- [ ] Revisão manual se necessário
- [ ] Merge para main
- [ ] Deletar branch feature
- [ ] Atualizar documentação central

---

## 📊 **Templates de Documentação**

### **Template: Relatório Diário**

```markdown
# 📊 Relatório da Bateria de Testes Diária

**Data:** [Data]
**DIA:** [Número] - [Descrição do objetivo]
**Branch:** [Branch atual]
**Commit:** [Hash] - [Mensagem do commit]

## 🎯 Objetivo do Dia

[Descrição do que foi planejado]

## 🧪 Bateria de Testes Executada

[Resultados de cada comando]

## 📈 Análise de Cobertura

[Estado atual da cobertura]

## 🎯 Priorização para Próximos Dias

[Próximos alvos e justificativas]

## 🏆 Conquistas do Dia

[O que foi implementado/corrigido]

## 📋 Checklist de Validação

[Verificações realizadas]

## 🚀 Recomendações para Próximo Dia

[Sugestões para continuar]
```

### **Template: Commit Message**

```
feat(tests): Implementar testes [ComponentName] com [X]% de cobertura

- ✅ [X] testes implementados
- ✅ Cobertura: [X]% statements, [X]% branches
- ✅ Testes de [funcionalidades principais]
- ✅ Tratamento de erros e edge cases
- ✅ Integração com [componentes relacionados]
- ✅ Validação de acessibilidade
```

---

## 🔧 **Scripts Auxiliares**

### **Comando para Análise Rápida:**

```bash
# Executar bateria completa e gerar relatório
npm run test:coverage && npm run coverage:analyze
```

### **Comando para Novo Dia:**

```bash
# Verificar status e criar nova branch
git status && git checkout main && git pull && git checkout -b feature/[component]-tests
```

---

## 📈 **Métricas de Sucesso**

### **Por Dia:**

- [ ] 1 arquivo com cobertura ≥ 85%
- [ ] 8-15 novos testes implementados
- [ ] 0 regressões em testes existentes
- [ ] Build e linting funcionando

### **Por Semana:**

- [ ] 5-7 arquivos com cobertura completa
- [ ] Cobertura geral aumentada em 10-15%
- [ ] Documentação atualizada
- [ ] Sem technical debt acumulado

### **Por Sprint (2 semanas):**

- [ ] Todos os componentes core cobertos
- [ ] Cobertura geral ≥ 80%
- [ ] Performance mantida
- [ ] CI/CD estável

---

## ⚠️ **Critérios de Bloqueio**

**Nunca prosseguir se:**

- [ ] Bateria inicial falhar
- [ ] Testes existentes quebrarem
- [ ] Build de produção falhar
- [ ] Conflitos git não resolvidos
- [ ] Performance degradar significativamente

---

## 🎯 **Filosofia de Qualidade**

> **"Cada linha de código deve ser testada. Cada teste deve ter propósito. Cada dia deve agregar valor."**

**Lema do Projeto:**

- **Confiabilidade:** Código que funciona sempre
- **Manutenibilidade:** Fácil de entender e modificar
- **Escalabilidade:** Preparado para crescer
- **Qualidade:** Sem compromissos com excelência

---

**✅ Siga este workflow religiosamente para garantir qualidade excepcional!** 🚀
