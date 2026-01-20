# Navigation Drawer - Cortex Bank

Microfrontend de navegação desenvolvido como parte do trabalho de pós-graduação em Engenharia de Front End.

## Sobre o Projeto

Este projeto é um microfrontend responsável pelo componente de navegação lateral (sidebar) do Cortex Bank. Ele foi desenvolvido utilizando a arquitetura de microfrontends com Single-SPA, permitindo que seja carregado e gerenciado de forma independente dentro de uma aplicação maior.

### Funcionalidades

- **Navegação lateral responsiva** com suporte para desktop e mobile
- **Seleção de contas** através de dropdown
- **Navegação entre rotas** (Dashboard, Extrato, Transações)
- **Logout** com limpeza de dados locais
- **Exibição de informações do usuário** e data atual
- **Tratamento de erros** com error boundary isolado
- **Integração com API** para busca de contas

## Tecnologias

- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática
- **Single-SPA** - Framework para microfrontends
- **Webpack** - Bundler e build tool
- **CSS Modules** - Estilização modular
- **Design System** - `@grupo10-pos-fiap/design-system` para componentes padronizados

## Estrutura do Projeto

```
navigation-drawer/
├── src/
│   ├── api/                    # Chamadas à API
│   │   └── account.api.ts
│   ├── components/             # Componentes reutilizáveis
│   │   └── AccountSelector.tsx
│   │   └── ErrorMessage.tsx
│   │   └── Icons.tsx
│   │   └── NavLink.tsx
│   │   └── UserProfile.tsx
│   ├── config/                 # Configurações
│   │   └── api.config.ts
│   ├── constants/             # Constantes Globais
│   │   └── index.ts
│   ├── hooks/                 # Hooks Customizados
│   │   └── useAccount.ts
│   │   └── useCurrentPath.ts
│   │   └── useMobile.ts
│   ├── styles/                 # Estilos globais
│   │   └── tokens.css
│   ├── types/                 # Types Globais
│   │   └── events.ts
│   ├── utils/                  # Utilitários
│   │   ├── accountStorage.ts
│   │   └── apiClient.ts
│   ├── cortex-bank-navigation-drawer.tsx  # Entry point do microfrontend
│   ├── root.component.tsx      # Componente principal
│   └── NavigationDrawer.module.css
├── webpack.config.js           # Configuração do Webpack
├── package.json
└── vercel.json                 # Configuração do Vercel
```

## Como Executar

### Pré-requisitos

- Node.js (versão 20 ou superior)

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd navigation-drawer
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo desenvolvimento:

```bash
npm start
```

O microfrontend estará disponível em `http://localhost:3001`

### Modo Standalone

Para executar o componente de forma isolada:

```bash
npm run start:standalone
```

### Build

Para gerar o build de produção:

```bash
npm run build
```

## Variáveis de Ambiente e Segurança

### ⚠️ Importante: Segurança de Variáveis de Ambiente

Por questões de segurança, **não utilizamos arquivos `.env`** neste projeto. Todas as variáveis de ambiente são configuradas diretamente na plataforma de hospedagem (Vercel).

### Por que não usar `.env`?

1. **Segurança**: Arquivos `.env` podem ser acidentalmente commitados no repositório, expondo credenciais e chaves de API
2. **Boas práticas**: Variáveis sensíveis devem ser gerenciadas pela plataforma de deploy, não no código fonte
3. **Auditoria**: A Vercel fornece controle de acesso e auditoria para variáveis de ambiente
4. **Ambientes separados**: Facilita o gerenciamento de diferentes valores para desenvolvimento, staging e produção

### Variáveis Configuradas na Vercel

As seguintes variáveis de ambiente devem ser configuradas no painel da Vercel:

- `API_BASE_URL`: URL base da API backend (ex: `https://api.cortexbank.com`)

### Configuração Local (Desenvolvimento)

Para desenvolvimento local, você pode definir variáveis de ambiente diretamente no terminal antes de executar:

```bash
API_BASE_URL=http://localhost:8080 npm start
```

Ou criar um arquivo `.env.local` (que está no `.gitignore`) apenas para desenvolvimento local. **Nunca commite este arquivo**.

## Deploy

O projeto está configurado para deploy automático na Vercel. O deploy é acionado automaticamente a cada push na branch `main`.

### Configuração do Deploy

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Headers de Segurança

O projeto inclui headers de segurança configurados no `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` configurado para permitir apenas recursos confiáveis

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run start:standalone` - Inicia em modo standalone (para execução isolada)
- `npm run build` - Gera o build de produção
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código com Prettier

## Licença

Este projeto foi desenvolvido como parte do trabalho de pós-graduação em Engenharia de Front End.

## Autores

- [Gabrielle Martins](https://github.com/Gabrielle-96)
- [Helen Cris](https://github.com/HelenCrisM)
