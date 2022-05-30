<p align="center">
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
</p>

---

# NestJS Boilerplate

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# Description

This project is a chassis, an starter code that represents the base microservice project to develop and deploy a 
[Nest](https://github.com/nestjs/nest) framework project.

This enables connection with an embedded [MongoDB](https://www.mongodb.com/) NoSQL database and serves a web API.

Fell free to enhance the code, building your domain structure;



## Table of contents

- [NestJS Boilerplate](#nestjs-boilerplate)
- [Description](#description)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Technologies](#technologies)
    - [Architecture](#architecture)
    - [Installation](#installation)
    - [Commitizen](#commitizen)
    - [ESLint](#eslint)
    - [Husky](#husky)
    - [Lint-staged](#lint-staged)
    - [Prettier](#prettier)
  - [Running the app](#running-the-app)
  - [Test](#test)

---

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Technologies

What things you need to install the software and how to install them :

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en/) 
- [Nest](https://github.com/nestjs/nest) 
- [Docker](https://www.docker.com/) 
- [Docker Compose](https://docs.docker.com/compose/) 
- [MongoDB](https://www.mongodb.com/)

---

### Architecture

- [Domain Driven Development](https://martinfowler.com/tags/domain%20driven%20design.html) 

- [Hexagonal Architecture (Ports & Adapters)](https://br.sensedia.com/post/use-of-the-hexagonal-architecture-pattern) 

---


### Installation

1. Clone the git repository

   ```bash
   git clone https://github.com/otaviocesar/nestjs-boilerplate.git
   ```

2. Go into the project directory

   ```bash
   cd nestjs-boilerplate/
   ```

3. Checkout working branch

   ```bash
   git checkout <branch>
   ```

4. Install NPM dependencies

   ```bash
   npm install
   ```

5. Rename ```.env-example``` file to  ```.env```  (Replace the values of the variables with your own)

---

### Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use `git cz` instead of `git commit` to use commitizen.

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)


---

### ESLint

[ESLint](https://eslint.org/) is a fully pluggable tool for identifying and reporting on patterns in JavaScript.

---

### Husky

[Husky](https://github.com/typicode/husky) is a package that helps you create Git hooks easily.

---

### Lint-staged

[Lint-staged](https://github.com/okonet/lint-staged) is a Node.js script that allows you to run arbitrary scripts against currently staged files.

---

### Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter.

---

## Running the app

```bash
$ npm run start:docker
```

---

## Test

```bash
# unit tests
$ npm run test

# integration tests
$ npm run test:integration

# test coverage
$ npm run test:cov
```

---