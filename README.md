# Plataforma de Planejamento de Estudos

Aplicação web para planejamento de estudos, baseada no design original do Figma.

- Design de referência: https://www.figma.com/design/2xe0v9N1PdemlkuVw6GudB/Plataforma-de-Planejamento-de-Estudos
- Stack principal: Vite + React + TypeScript

## Pré-requisitos

Antes de começar, garanta que você tem instalado:

- **Node.js** 18+ (recomendado 20 LTS)
- **npm** 9+ (ou pnpm, se preferir)

Verifique com:

```bash
node -v
npm -v
```

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Scripts disponíveis

- `npm run dev` — inicia o ambiente de desenvolvimento com hot reload.
- `npm run build` — gera build de produção.

## Estrutura esperada

Este projeto utiliza entrada em `src/main.tsx` (referenciada por `index.html`) e alias `@` apontando para `src` (configurado no `vite.config.ts`).

Se esses arquivos/pastas estiverem ausentes, a aplicação não iniciará corretamente.

## Solução de problemas

### Erro ao iniciar por falta de `src/main.tsx`

Crie a estrutura base do projeto React/TS dentro de `src/` ou restaure os arquivos faltantes.

### Dependências não instalam

Tente limpar e reinstalar:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Próximos passos recomendados

- Adicionar seção de arquitetura/componentes.
- Documentar convenções de código e fluxo de contribuição.
- Incluir instruções de deploy.
