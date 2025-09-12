# 🎯 Template de Pull Request - Movie Explorer

**Baseado em boas práticas de SoundCloud, Microsoft, dbt Labs e adaptado para nosso DAILY_WORKFLOW_STANDARD**

## 📋 Padrão de PR para Movie Explorer

### **Elementos Essenciais (Sempre incluir):**

| **Seção**                      | **Propósito**        | **O que incluir**                                                                 |
| ------------------------------ | -------------------- | --------------------------------------------------------------------------------- |
| **🏷️ Título claro**            | Identificação rápida | Prefixo + descrição sucinta (feat:, fix:, test:, docs:, refactor:, perf:, chore:) |
| **📋 Descrição & Motivação**   | Contexto do PR       | Por que existe? Qual problema resolve? Que valor agrega?                          |
| **🔧 Mudanças Implementadas**  | O que foi alterado   | Módulos afetados, lógica nova/removida, refatorações                              |
| **🧪 Validação**               | Como verificar       | Testes passando, build funcionando, lint limpo                                    |
| **🎯 DAILY_WORKFLOW_STANDARD** | Conformidade         | Etapas seguidas do nosso processo padrão                                          |

### **Elementos Contextuais (Incluir quando aplicável):**

| **Seção**                 | **Quando usar**                | **Conteúdo**                                       |
| ------------------------- | ------------------------------ | -------------------------------------------------- |
| **🧪 Testes & Cobertura** | PRs de teste                   | Tipos implementados, cobertura alcançada, métricas |
| **🚀 Como Testar**        | Funcionalidades novas/críticas | Passo a passo, comandos, cenários                  |
| **📷 Evidências Visuais** | Mudanças de UI/UX              | Screenshots antes/depois, GIFs, fluxos             |
| **⚠️ Breaking Changes**   | Mudanças incompatíveis         | Detalhes de migração, impactos                     |
| **💬 Observações**        | Decisões importantes           | Trade-offs, dúvidas, contexto técnico              |

---

## 🏷️ Prefixos Padrão

- **🎯 feat:** Nova funcionalidade
- **🐛 fix:** Correção de bug
- **🧪 test:** Implementação de testes
- **📚 docs:** Atualização de documentação
- **♻️ refactor:** Refatoração sem mudança funcional
- **⚡ perf:** Melhoria de performance
- **🔧 chore:** Tarefas de manutenção

---

## 📄 Template Completo

````markdown
# 🎯 [Prefixo]: Título Descritivo

## 📋 Resumo

**Descrição concisa do que foi implementado/alterado**

**Tipo:** [ ] Bug fix [ ] Feature [ ] Testes [ ] Docs [ ] Refatoração [ ] Performance  
**Prioridade:** [ ] Baixa [ ] Média [ ] Alta [ ] Crítica  
**DIA:** X (se seguindo cronograma)

---

## 🎯 Motivação & Contexto

- **Problema:** O que motivou este PR
- **Contexto:** Situação atual e necessidade
- **Valor:** Benefício para projeto/usuários

---

## 🔧 Mudanças Implementadas

### **Arquivos Principais:**

- `arquivo1.tsx` - Descrição da mudança
- `arquivo2.test.tsx` - Testes implementados
- `arquivo3.ts` - Refatoração/correção

### **Funcionalidades:**

- ✅ Item implementado A
- ✅ Correção B aplicada
- ✅ Refatoração C realizada

---

## 🧪 Testes & Cobertura _(Para PRs de teste)_

### **Testes Implementados:**

- [ ] **Rendering & Initial State** - X testes
- [ ] **User Interactions** - X testes
- [ ] **Props & Configuration** - X testes
- [ ] **Error Handling** - X testes
- [ ] **Integration** - X testes
- [ ] **Accessibility** - X testes

### **Cobertura Alcançada:**

- **Arquivo principal:** X% → X% (+X%)
- **Cobertura geral:** X% → X% (+X%)

---

## ✅ Validação Completa

- [ ] 🧪 Todos os testes passando (X/X)
- [ ] 🏗️ Build de produção funcionando
- [ ] 🔍 ESLint sem warnings
- [ ] 📊 Cobertura mantida/melhorada
- [ ] 🚀 Performance preservada

---

## 🚀 Como Testar _(Para funcionalidades)_

### **Pré-requisitos:**

```bash
node >= 18.0.0
npm >= 9.0.0
```
````

### **Passos:**

```bash
git checkout [branch-name]
npm install
npm test
npm run build
npm run lint
```

### **Cenários:**

- Cenário A: Como testar
- Cenário B: Como validar

---

## 📷 Evidências Visuais _(Para UI/UX)_

**Antes:**
[Screenshot/GIF]

**Depois:**
[Screenshot/GIF]

---

## 🎯 DAILY_WORKFLOW_STANDARD

- [ ] 📝 Branch criada com nome descritivo
- [ ] 📊 Análise de cobertura realizada
- [ ] 🎯 Priorização baseada em impacto
- [ ] ⚡ Desenvolvimento focado
- [ ] ✅ Validações completas

---

## ⚠️ Breaking Changes

- [ ] ❌ Sem breaking changes
- [ ] ⚠️ Contém breaking changes:
  - **Mudança:** Descrição
  - **Migração:** Como adaptar
  - **Impacto:** O que quebra

---

## 💬 Observações

**Decisões importantes:**

- Decisão A: Justificativa
- Trade-off B: Razão

**Próximos passos:**

- [ ] Tarefa relacionada
- [ ] Melhoria futura

---

> **"Cada linha de código deve ser testada. Cada teste deve ter propósito. Cada dia deve agregar valor."**

**🏆 Seguindo o DAILY_WORKFLOW_STANDARD**

```

---

## 🎯 Customizações para Movie Explorer

### **Para PRs de Teste:**
- Sempre incluir seção **🧪 Testes & Cobertura**
- Especificar categorias testadas (Rendering, Interactions, etc.)
- Mostrar impacto na cobertura geral
- Validar build + lint + performance

### **Para PRs de Feature:**
- Incluir seção **🚀 Como Testar**
- Screenshots/GIFs se houver mudança visual
- Validar responsividade e compatibilidade
- Testar em diferentes navegadores

### **Para PRs de Documentação:**
- Foco na organização e clareza
- Links para arquivos relacionados
- Impacto na estrutura geral
- Facilidade de navegação

### **Para PRs de Refatoração:**
- Justificar necessidade da mudança
- Garantir que funcionalidade permanece igual
- Mostrar melhorias de performance/manutenibilidade
- Validar que todos os testes continuam passando

---

## 📈 Filosofia do Template

**Nosso template segue os princípios:**

1. **🎯 Clareza:** Cada seção tem propósito específico
2. **📊 Validação:** Sempre validar qualidade antes do merge
3. **🔄 Consistência:** Seguir o DAILY_WORKFLOW_STANDARD
4. **📚 Documentação:** Facilitar review e histórico
5. **🚀 Qualidade:** Manter alto padrão de desenvolvimento

**Resultado:** PRs bem documentados, fáceis de revisar e que mantém a qualidade do projeto.
```
