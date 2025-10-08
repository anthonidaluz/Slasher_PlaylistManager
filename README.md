# Slasher Playlist Manager 🎵

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Status do Projeto: Concluído**

## Sobre o Projeto

Esta aplicação é um **Gerenciador de Playlists** desenvolvido como atividade avaliativa para a unidade curricular de **Tópicos Especiais em Programação**, do 8º semestre do curso de Ciência da Computação no Instituto Federal de Santa Catarina - Câmpus Lages. O projeto foi orientado pela docente **Drª Lidiane Visintin**.

O objetivo principal foi desenvolver uma aplicação web completa utilizando o ecossistema moderno de React, abrangendo desde a autenticação de usuários e gerenciamento de estado global até o consumo de APIs externas e persistência de dados no navegador.

## Funcionalidades Principais

A aplicação cumpre todos os requisitos propostos na avaliação, incluindo:

-   [x] **Autenticação de Usuários:** Página de login com validação de e-mail e senha, redirecionando para a home se autenticado.
-   [x] **Rotas Protegidas:** Acesso restrito ao dashboard apenas para usuários autenticados, implementado com um componente `PrivateRoute`.
-   [x] **Gerenciamento de Estado Global:** Utilização do Redux Toolkit para gerenciar o estado de autenticação, playlists e buscas de forma centralizada.
-   [x] **CRUD Completo de Playlists:** Funcionalidades para criar, ler, renomear e excluir playlists, com restrição de acesso por usuário.
-   [x] **Persistência de Dados:** As playlists do usuário são salvas no **LocalStorage**, e dados temporários da sessão são salvos no **SessionStorage**.
-   [x] **Integração com API Externa:** Consumo de dados da API **TheAudioDB** para buscar músicas e listar as mais populares.
-   [x] **Busca em Tempo Real:** Interface de busca por artista, álbum ou nome da música que exibe resultados dinamicamente.
-   [x] **Interface Reativa e Componentizada:** Layout com feedback visual para o usuário (carregamento, erros) e código bem estruturado em componentes.

## Tecnologias Utilizadas

-   **React:** Biblioteca principal para a construção da interface de usuário.
-   **TypeScript:** Para adicionar tipagem estática ao JavaScript, garantindo um código mais seguro e manutenível.
-   **Redux Toolkit:** Para gerenciamento de estado global de forma eficiente e previsível.
-   **React Router:** Para a criação e gerenciamento das rotas da aplicação (públicas e privadas).
-   **Tailwind CSS:** Para estilização rápida e consistente através de classes utilitárias.
-   **Vite:** Ferramenta de build moderna e extremamente rápida para o ambiente de desenvolvimento.
-   **Lucide React:** Biblioteca de ícones para uma interface mais limpa e intuitiva.

## Como Executar o Projeto

**Pré-requisitos:**
* Node.js (versão 18 ou superior)
* npm ou yarn

```bash
# 1. Clone o repositório
git clone https://github.com/anthonidaluz/Slasher_PlaylistManager.git

# 2. Navegue até a pasta do projeto
cd Slasher

# 3. Instale as dependências
npm install
# ou
yarn install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev

# 5. Abra http://localhost:5173 (ou a porta indicada) no seu navegador.
```

## Autor
**Aluno** *[Anthoni Liederson da Luz]*
