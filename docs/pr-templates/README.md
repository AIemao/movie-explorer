# 📝 Templates de Pull Request - Movie Explorer

Esta pasta contém os templates e padrões para criação de Pull Requests seguindo nosso **DAILY_WORKFLOW_STANDARD**.

## 📂 Arquivos Disponíveis

### **📄 PR_DESCRIPTION.md**

**Template e guia completo de PR para Movie Explorer**

- Baseado em boas práticas (SoundCloud, Microsoft, dbt Labs)
- Adaptado para nosso contexto de desenvolvimento com foco em testes
- Inclui seções específicas para diferentes tipos de PR

### **📄 PULL_REQUEST_TEMPLATE.md**

**Template automático do GitHub**

- **Localização:** `.github/PULL_REQUEST_TEMPLATE.md`
- **Uso:** Automático - carregado pelo GitHub ao criar PRs
- **Versão:** Otimizada e concisa do template completo

### **📄 EXEMPLO_DIA3.md**

**Exemplo prático do template preenchido**

- Baseado no PR real do DIA 3 (Header.tsx + documentação)
- Mostra como usar cada seção
- Referência para PRs futuros

---

## 🎯 Como Usar os Templates

### **Para PRs via GitHub Web:**

1. Criar PR pela interface
2. Template será carregado automaticamente
3. Preencher seções relevantes
4. Remover seções não aplicáveis

### **Para PRs manuais/CLI:**

1. Consultar `PR_DESCRIPTION.md` para orientações
2. Copiar template da seção correspondente
3. Adaptar conforme tipo de mudança
4. Seguir exemplo em `EXEMPLO_DIA3.md`

---

## 🏷️ Prefixos Padrão Movie Explorer

| **Prefixo**    | **Uso**                 | **Exemplo**                                   |
| -------------- | ----------------------- | --------------------------------------------- |
| `🎯 feat:`     | Nova funcionalidade     | `feat: adicionar sistema de favoritos`        |
| `🐛 fix:`      | Correção de bug         | `fix: resolver erro na navegação`             |
| `🧪 test:`     | Implementação de testes | `test: implementar testes CategoryList.tsx`   |
| `📚 docs:`     | Documentação            | `docs: atualizar guia de instalação`          |
| `♻️ refactor:` | Refatoração             | `refactor: melhorar estrutura de componentes` |
| `⚡ perf:`     | Performance             | `perf: otimizar carregamento de imagens`      |
| `🔧 chore:`    | Manutenção              | `chore: atualizar dependências`               |

---

## 📋 Seções por Tipo de PR

### **🧪 PRs de Teste (test:)**

**Seções obrigatórias:**

- ✅ 📋 Resumo com DIA
- ✅ 🎯 Motivação & Contexto
- ✅ 🔧 Mudanças Implementadas
- ✅ 🧪 Testes & Cobertura
- ✅ ✅ Validação Completa
- ✅ 🎯 DAILY_WORKFLOW_STANDARD

**Seções opcionais:**

- 🚀 Como Testar (se complexo)
- 💬 Observações (decisões técnicas)

### **🎯 PRs de Feature (feat:)**

**Seções obrigatórias:**

- ✅ 📋 Resumo
- ✅ 🎯 Motivação & Contexto
- ✅ 🔧 Mudanças Implementadas
- ✅ 🚀 Como Testar
- ✅ ✅ Validação Completa

**Seções contextuais:**

- 📷 Evidências Visuais (se UI/UX)
- ⚠️ Breaking Changes (se aplicável)
- 🧪 Testes & Cobertura (se incluir testes)

### **🐛 PRs de Fix (fix:)**

**Seções obrigatórias:**

- ✅ 📋 Resumo
- ✅ 🎯 Motivação & Contexto (bug descrito)
- ✅ 🔧 Mudanças Implementadas
- ✅ ✅ Validação Completa

**Seções recomendadas:**

- 🚀 Como Testar (cenário do bug)
- 📷 Evidências Visuais (antes/depois)

---

## ✅ Checklist de Qualidade PR

**Antes de criar o PR:**

- [ ] 🏷️ Título com prefixo correto
- [ ] 📝 Todas as seções obrigatórias preenchidas
- [ ] 🧪 Testes passando (42/42 ou mais)
- [ ] 🏗️ Build funcionando
- [ ] 🔍 Lint limpo
- [ ] 📊 Cobertura mantida/melhorada

**Durante o review:**

- [ ] 👥 Self-review completo
- [ ] 📖 Descrição clara e objetiva
- [ ] 🔄 DAILY_WORKFLOW_STANDARD seguido
- [ ] 💬 Observações importantes documentadas

---

## 🎯 Filosofia dos Templates

### **Princípios Movie Explorer:**

1. **🎯 Clareza:** Cada PR conta uma história completa
2. **📊 Validação:** Qualidade sempre validada antes do merge
3. **🔄 Consistência:** DAILY_WORKFLOW_STANDARD em todos os PRs
4. **📚 Documentação:** Facilitar review e histórico
5. **🚀 Qualidade:** Manter alto padrão sempre

### **Resultado esperado:**

- ✅ PRs bem documentados e fáceis de revisar
- ✅ Histórico claro de evolução do projeto
- ✅ Qualidade consistente em todas as mudanças
- ✅ Facilidade para novos desenvolvedores
- ✅ Rastreabilidade completa de decisões

---

> **"Cada PR deve contar uma história clara: o que foi feito, por que foi feito, e como validar que funciona."**

**🏆 Seguindo o DAILY_WORKFLOW_STANDARD - Movie Explorer**
