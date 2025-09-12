# 🧪 Test Implementation Templates

## Template Principal - Implementação de Testes

````markdown
# 🧪 test: Implementação testes [COMPONENTE/SERVIÇO]

## 📋 Resumo

Implementação de testes abrangentes para `[NOME_DO_ARQUIVO]` seguindo as melhores práticas e padrões do projeto.

**Tipo:** [x] Testes [ ] Feature [ ] Bug fix [ ] Docs [ ] Refatoração  
**Prioridade:** [x] Alta [ ] Média [ ] Baixa [ ] Crítica  
**DIA:** X (seguindo DAILY_WORKFLOW_STANDARD)

## 📊 Métricas de Cobertura

### Antes:

- **Statements:** X%
- **Branches:** X%
- **Functions:** X%
- **Lines:** X%

### Depois:

- **Statements:** X%
- **Branches:** X%
- **Functions:** X%
- **Lines:** X%

**Meta de Cobertura:** ✅ 85-100% alcançada

## 🧪 Estratégia de Testes

### Tipos de Teste Implementados:

- [ ] **Unit Tests:** Testes unitários com mocks completos (vi.mock)
- [ ] **Integration Tests:** Testes de integração com MSW (Mock Service Worker)
- [ ] **Component Tests:** Testes de componentes React (Testing Library)
- [ ] **API Tests:** Testes de serviços e APIs com interceptação MSW

### Cenários Cobertos:

- [ ] **Happy Path:** Fluxos principais funcionando
- [ ] **Error Handling:** Tratamento de erros e edge cases
- [ ] **Edge Cases:** Casos extremos e limites
- [ ] **User Interactions:** Interações do usuário
- [ ] **API Failures:** Falhas de rede, timeouts, etc.

## 🔧 Ferramentas Utilizadas

- [ ] **Vitest:** Framework de testes principal
- [ ] **Testing Library:** Testes de componentes React
- [ ] **MSW (Mock Service Worker):** Interceptação de requisições HTTP
- [ ] **Vi.mock():** Mocks de módulos e funções

## 📁 Arquivos Modificados

### Novos Arquivos:

- `src/test/[tipo]/[nome].test.ts` - Testes unitários
- `src/test/[tipo]/[nome].integration.test.ts` - Testes de integração (se aplicável)
- `src/test/mocks/[nome]-handlers.ts` - Handlers MSW (se aplicável)

### Arquivos Atualizados:

- `vitest.config.ts` - Configurações de teste (se necessário)
- `package.json` - Dependências de teste (se necessário)

## ✅ Checklist de Qualidade

### Padrões de Código:

- [ ] **Nomenclatura:** Nomes descritivos para testes e cenários
- [ ] **Organização:** Testes agrupados logicamente em `describe` blocks
- [ ] **Isolamento:** Cada teste é independente e isolado
- [ ] **Clareza:** Assertions específicas e mensagens claras

### Cobertura:

- [ ] **85%+ Functions:** Principais funções testadas
- [ ] **85%+ Statements:** Declarações críticas cobertas
- [ ] **85%+ Branches:** Principais branches testados
- [ ] **Edge Cases:** Cenários de erro cobertos

### Performance:

- [ ] **Tempo Execução:** Testes executam rapidamente (< 10s total)
- [ ] **Setup/Teardown:** Limpeza adequada entre testes
- [ ] **Mocks Eficientes:** Mocks não vazam entre testes

## 🎯 Bateria de Testes

```bash
npm test -- --run --reporter=verbose
```

**Resultado:** ✅ X/X testes passando

## ✅ Validação Completa

- [ ] 🧪 Todos os testes passando (X/X)
- [ ] 🏗️ Build de produção funcionando
- [ ] 🔍 ESLint sem warnings/errors
- [ ] 📊 Cobertura mantida/melhorada (85%+)
- [ ] 🚀 Performance preservada

## 📈 Impacto

### Benefícios:

- ✅ **Confiabilidade:** Código testado e validado
- ✅ **Manutenibilidade:** Facilita refatorações futuras
- ✅ **Documentação:** Testes servem como documentação viva
- ✅ **CI/CD:** Previne regressões em deploys

### Riscos Mitigados:

- 🛡️ **Regressões:** Mudanças futuras não quebram funcionalidades
- 🛡️ **Edge Cases:** Cenários raros estão cobertos
- 🛡️ **API Changes:** Alterações de API são detectadas

## 📚 Documentação Relacionada

- [ ] README.md atualizado com instruções de teste
- [ ] CONTRIBUTING.md com padrões de teste
- [ ] Comentários no código explicando lógica complexa

---

**Reviewer Guidelines:**

1. Verificar se todos os testes passam
2. Validar cobertura atingiu meta (100%)
3. Confirmar que testes são determinísticos
4. Checar se mocks estão bem implementados
5. Testar cenários de erro manualmente se necessário
````

## Template para Testes de API

````markdown
# 🧪 test: Implementação testes API tmdb.ts

## 📋 Resumo

Implementação de testes abrangentes para o serviço de API `tmdb.ts` com MSW (Mock Service Worker) para interceptação de requisições HTTP e mocks tradicionais para testes unitários.

**Tipo:** [x] Testes [ ] Feature [ ] Bug fix [ ] Docs [ ] Refatoração
**Prioridade:** [x] Alta [ ] Média [ ] Baixa [ ] Crítica
**DIA:** 4 (seguindo DAILY_WORKFLOW_STANDARD)

## 📊 Métricas de Cobertura

### Antes:

- **tmdb.ts:** 43.39% (necessitava melhorias)

### Depois:

- **tmdb.ts:** 100% Statements, 90% Branches, 100% Functions, 100% Lines

**Meta de Cobertura:** ✅ 85-100% alcançada

## 🧪 Estratégia Dual de Testes

### 1. Unit Tests (tmdb.test.ts):

- ✅ **Mocks Completos:** vi.mock() para interceptar módulo inteiro
- ✅ **Contract Testing:** Validação de chamadas e parâmetros
- ✅ **Fast Execution:** Testes rápidos sem requisições reais

### 2. Integration Tests (tmdb.integration.test.ts):

- ✅ **MSW Handlers:** Interceptação na camada de rede
- ✅ **Real Code Execution:** Código real do tmdb.ts executado
- ✅ **HTTP Scenarios:** Cenários de erro, timeout, network failures

## 🔧 Implementação MSW

### Handlers Criados:

- ✅ `GET /movie/now_playing` - Com paginação e cenários de erro
- ✅ `GET /movie/:id` - Com tratamento de filme não encontrado
- ✅ `GET /genre/movie/list` - Lista de gêneros
- ✅ `GET /discover/movie` - Filmes por gênero com filtros

### Cenários de Erro:

- ✅ **Network Error:** Simulação de falha de rede
- ✅ **404 Not Found:** Recursos não encontrados
- ✅ **401 Unauthorized:** Erro de autenticação
- ✅ **Timeout:** Requisições que demoram demais

## 📁 Arquivos Implementados

### Novos Arquivos:

- `src/test/api/tmdb.integration.test.ts` - 23 testes de integração
- `src/test/mocks/tmdb-handlers.ts` - Handlers MSW para todas as rotas
- `src/test/msw-setup.ts` - Configuração global do MSW

### Arquivos Atualizados:

- `src/test/api/tmdb.test.ts` - Reescrito com 12 testes unitários
- `vitest.config.ts` - Adicionado setup do MSW
- `package.json` - MSW adicionado como devDependency

## ✅ Bateria de Testes Final

```bash
npm test -- --run --reporter=verbose
```
````

**Resultado:** ✅ 74/74 testes passando

- Header: 23 testes ✅
- CategoryList: 12 testes ✅
- tmdb (unit): 12 testes ✅
- MovieCard: 4 testes ✅
- tmdb (integration): 23 testes ✅

## ✅ Validação Completa DIA 4

- [x] 🧪 Todos os testes passando (74/74)
- [x] 🏗️ Build de produção funcionando
- [x] 🔍 ESLint sem warnings/errors
- [x] 📊 Cobertura tmdb.ts: 100% (meta 85%+ superada)
- [x] 🚀 Performance preservada
- [x] 📋 MSW setup funcionando
- [x] 🎯 Real code execution confirmado

## 📈 Benefícios Alcançados

### Qualidade:

- ✅ **85-100% Coverage:** tmdb.ts adequadamente testado
- ✅ **MSW Integration:** Interceptação HTTP com Mock Service Worker
- ✅ **Real Code:** Código real executado nos testes de integração
- ✅ **Error Scenarios:** Casos de erro críticos cobertos
- ✅ **Deterministic:** Testes consistentes e confiáveis

### Manutenibilidade:

- ✅ **MSW Setup:** Reutilizável para outros serviços de API
- ✅ **Mock Handlers:** Facilmente extensíveis
- ✅ **Documentation:** Testes servem como documentação da API

### CI/CD:

- ✅ **Regression Prevention:** Evita quebras em mudanças futuras
- ✅ **API Contract:** Valida contratos de API
- ✅ **Fast Feedback:** Detecção rápida de problemas

---

**Logs de Execução Visíveis:**

```
Fazendo requisição para: https://api.themoviedb.org/3/movie/now_playing
Resposta da API: { page: 1, results: [...] }
```

_Confirmação de que o código real está sendo executado_

````

## Template para Testes de Components

```markdown
# 🧪 test: Implementação testes componente [NOME]

## 📋 Resumo

Implementação de testes abrangentes para o componente React `[NOME]` utilizando Testing Library e Vitest, cobrindo renderização, interações do usuário, estados e integração.

**Tipo:** [x] Testes [ ] Feature [ ] Bug fix [ ] Docs [ ] Refatoração
**Prioridade:** [x] Alta [ ] Média [ ] Baixa [ ] Crítica
**DIA:** X (seguindo DAILY_WORKFLOW_STANDARD)

## 🧪 Cenários de Teste Implementados

### 1. Renderização e Estado Inicial:
- [ ] Renderização correta da estrutura base
- [ ] Props padrão aplicadas adequadamente
- [ ] Estado inicial configurado corretamente
- [ ] Elementos visuais presentes

### 2. Interações do Usuário:
- [ ] Cliques em botões e links
- [ ] Eventos de teclado (acessibilidade)
- [ ] Hover e focus states
- [ ] Formulários e inputs (se aplicável)

### 3. Props e Configuração:
- [ ] Props obrigatórias e opcionais
- [ ] Diferentes combinações de props
- [ ] Props inválidas tratadas adequadamente
- [ ] Callback functions chamadas corretamente

### 4. Estados e Ciclo de Vida:
- [ ] Mudanças de estado internas
- [ ] Loading states
- [ ] Error states
- [ ] Success states

### 5. Integração:
- [ ] Integração com Context API
- [ ] Integração com React Router
- [ ] Comunicação com componentes filhos
- [ ] Chamadas para utils e constants

### 6. Acessibilidade:
- [ ] ARIA labels e roles corretos
- [ ] Navegação por teclado
- [ ] Screen reader compatibility
- [ ] Semantic HTML

## 🔧 Ferramentas Utilizadas

- [ ] **@testing-library/react:** Renderização e queries
- [ ] **@testing-library/user-event:** Simulação de interações
- [ ] **vitest:** Framework de testes e assertions
- [ ] **vi.mock():** Mocks de dependências externas

## ✅ Checklist de Qualidade

### Boas Práticas:
- [ ] **Queries por prioridade:** getByRole > getByLabelText > getByText
- [ ] **User-centric:** Testes focados na experiência do usuário
- [ ] **Isolation:** Cada teste limpa o estado anterior
- [ ] **Descriptive:** Nomes de teste descrevem o comportamento esperado

### Cobertura:
- [ ] **All Branches:** Todos os caminhos condicionais testados
- [ ] **Event Handlers:** Todos os handlers de evento cobertos
- [ ] **Error Boundaries:** Cenários de erro testados
- [ ] **Edge Cases:** Casos extremos considerados

---

**Testing Philosophy:** "Test behavior, not implementation"
````
