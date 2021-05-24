# MovieFlix

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/luisinho/movieflix/blob/main/LICENSE) 

# Sobre o projeto

Link front-end em desenvolvimento

MovieFlix é uma aplicação full stack web e mobile construída durante o **Bootcamp DevSuperior** (#BDS2), evento organizado pela [DevSuperior](https://devsuperior.com "Site da DevSuperior").

A aplicação consiste em um banco de filmes, os quais podem ser listados e avaliados pelos usuários. Usuários podem ser visitantes (VISITOR) e membros (MEMBER). Apenas usuários membros podem inserir avaliações no sistema.

Ao acessar o sistema, o usuário deve fazer seu login. Apenas usuários logados podem navegar nos filmes. Logo após fazer o login, o usuário vai para a listagem de filmes, que mostra os filmes de forma paginada, ordenados alfabeticamente por título. O usuário pode filtrar os filmes por gênero.

Ao selecionar um filme da listagem, é mostrada uma página de detalhes, onde é possível ver todas informações do filme, e também suas avaliações. Se o usuário for usuário membro, ele pode ainda registrar uma avaliação nessa tela.

Um usuário possui nome, email e senha, sendo que o email é seu nome de usuário. Cada filme possui um título, subtítulo, uma imagem, ano de lançamento, sinopse, e um gênero. Os usuários membros podem registrar avaliações para os filmes. Um mesmo usuário membro pode deixar mais de uma avaliação para o mesmo filme.

# Link Heroku
https://dashboard.heroku.com/apps/luis-movieflix

## Layout mobile
![Enter Login](https://github.com/luisinho/assets-projects/blob/main/movieflix/enter-login.png?raw=true)![Mobile Login](https://github.com/luisinho/assets-projects/blob/main/movieflix/mobile-login.png?raw=true)

![List Movie](https://github.com/luisinho/assets-projects/blob/main/movieflix/mobile-list-movie.png?raw=true)![Detail Movie](https://github.com/luisinho/assets-projects/blob/main/movieflix/mobile-detail-movie.png?raw=true)

## Layout web
![Login](https://github.com/luisinho/assets-projects/blob/main/movieflix/login.png?raw=true)

![List Movie](https://github.com/luisinho/assets-projects/blob/main/movieflix/list-movie.png?raw=true)

![Detail Movie](https://github.com/luisinho/assets-projects/blob/main/movieflix/detail-movie.png?raw=true)

## Modelo conceitual
![Modelo Conceitual](https://github.com/luisinho/assets-projects/blob/main/movieflix/modelo_conceitual.png?raw=true)

# Tecnologias utilizadas
## Back end
- Java
- Spring Boot
- JPA / Hibernate
- Maven
## Front end
- HTML / CSS / Bootstrap-4.6.0 / TypeScript
- ReactJS
- React Native
## Implantação em produção
- Back end: Heroku
- Front end web: Netlify
- Banco de dados: Postgresql

# Como executar o projeto

## Back end
Pré-requisitos: Java 11

```bash
# clonar repositório
git clone https://github.com/luisinho/movieflix.git

# entrar na pasta do projeto back end
cd backend

# executar o projeto
./mvnw spring-boot:run
```

## Front end web
Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/luisinho/movieflix.git

# entrar na pasta do projeto front end web
cd front-web

# instalar dependências
npm install

# executar o projeto
npm start
```

# Autor

Luis Antonio Batista dos Santos

https://www.linkedin.com/in/luis-antonio-batista-dos-santos-5a37b781

movieflix
