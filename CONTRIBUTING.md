# 🤝 Contribuindo para o Movie Explorer

Obrigado por considerar contribuir para o Movie Explorer! Este projeto foi criado para estudos de testes unitários e E2E.

## 🚀 Como Contribuir

### 1. Fork & Clone

```bash
git fork https://github.com/seu-usuario/movie-explorer
git clone https://github.com/seu-usuario/movie-explorer.git
cd movie-explorer
```

### 2. Configuração

```bash
npm install
cp .env.example .env
# Configure sua chave da TMDb no arquivo .env
npm run dev
```

### 3. Desenvolvimento

#### Branch Naming

- `feature/nome-da-feature` - Para novas funcionalidades
- `fix/nome-do-bug` - Para correções
- `test/nome-do-teste` - Para adição de testes
- `docs/nome-da-doc` - Para documentação

#### Commit Messages

Use conventional commits:

- `feat: adiciona filtro por ano de lançamento`
- `fix: corrige bug no carregamento de imagens`
- `test: adiciona testes para MovieCard`
- `docs: atualiza README com nova funcionalidade`

### 4. Testes

```bash
# Executar testes unitários
npm run test

# Executar testes com interface
npm run test:ui

# Executar testes com coverage
npm run test:coverage
```

### 5. Pull Request

1. Crie uma branch para sua feature
2. Faça commit das suas alterações
3. Escreva testes para novas funcionalidades
4. Certifique-se que todos os testes passam
5. Execute o linting: `npm run lint`
6. Abra um Pull Request

## 📋 Checklist para PR

- [ ] Código testado e funcionando
- [ ] Testes escritos/atualizados
- [ ] Linting passou (`npm run lint`)
- [ ] Documentação atualizada se necessário
- [ ] Mensagens de commit seguem o padrão

## 🎯 Áreas que Precisam de Ajuda

- **Testes**: Cobertura de testes unitários e E2E

## 💡 Ideias de Funcionalidades

- [ ] Sistema de favoritos (localStorage)
- [ ] Busca por filmes
- [ ] Filtros avançados (ano, rating, etc.)
- [ ] Modo offline
- [ ] PWA features
- [ ] Trailers dos filmes
- [ ] Informações do elenco
- [ ] Compartilhamento social
