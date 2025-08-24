# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [Unreleased] - Branch: feature/analise-cobertura-melhorada

### ✨ Adicionado

- **Script personalizado de análise de cobertura** (`scripts/coverage-summary.js`)
  - Análise detalhada por arquivo individual
  - Categorização inteligente: boa cobertura (≥80%), parcial (<80%), sem cobertura
  - Estatísticas abrangentes: total de arquivos, percentual com/sem testes
  - Informações úteis para desenvolvimento: comandos, estrutura de testes
  - Orientações práticas para próximos passos

### 🛠️ Melhorado

- **package.json**
  - Novo script: `npm run coverage:analyze` - executa análise personalizada
  - Script atualizado: `npm run test:coverage:summary` - executa cobertura + análise

### 📚 Documentação

- **README.md** atualizado com:
  - Nova seção "📊 Análise de Cobertura Personalizada"
  - Exemplo visual da saída do script
  - Estrutura detalhada de testes
  - Status atual dos testes implementados
  - Scripts disponíveis atualizados
  - Próximos passos reorganizados

### 🎯 Funcionalidades do Script

- ✅ Filtragem automática de arquivos de teste e configuração
- ✅ Cálculo de cobertura por arquivo individual
- ✅ Categorização visual com emojis
- ✅ Suporte para caminhos Windows e Unix
- ✅ Orientações contextuais para desenvolvimento
- ✅ Lista de comandos úteis integrada

### 📊 Estado Atual da Cobertura

- **Total de arquivos analisados:** 12
- **Arquivos com testes:** 3 (25.0%)
- **Cobertura geral:** 19.89%
- **Arquivos com boa cobertura (≥80%):**
  - `src/styles/GlobalStyles.ts` - 100.0%
  - `src/components/MovieCard.tsx` - 95.5%
- **Arquivos com cobertura parcial:**
  - `src/api/tmdb.ts` - 43.4%
- **Arquivos sem cobertura:** 9 arquivos (75%)

### 🔄 Compatibilidade

- ✅ Windows (caminhos com barras invertidas)
- ✅ Unix/Linux (caminhos com barras normais)
- ✅ Node.js ES Modules
- ✅ Integração com Vitest coverage

## [1.0.0] - 2025-01-24

### ✨ Lançamento Inicial

- Aplicação Movie Explorer completa
- Integração com TMDb API
- Sistema de temas claro/escuro
- Design responsivo
- Navegação por gêneros
- Configuração básica de testes com Vitest
