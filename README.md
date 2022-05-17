<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

---

# Description

This project is a chassis, an starter code that represents the base microservice project to develop and deploy a 
[Nest](https://github.com/nestjs/nest) framework project.

This enables connection with an embedded [MongoDB](https://www.mongodb.com/) NoSQL database and serves a web API.

Fell free to enhance the code, building your domain structure;

---
# Technologies

[Docker](https://www.docker.com/) 

[Docker Compose](https://docs.docker.com/compose/) 

[Nest](https://github.com/nestjs/nest) 

[NodeJS](https://nodejs.org/en/) 

[MongoDB](https://www.mongodb.com/)

--- 

# Architecture

[Domain Driven Development](https://martinfowler.com/tags/domain%20driven%20design.html) 

[Hexagonal Architecture (Ports & Adapters)](https://br.sensedia.com/post/use-of-the-hexagonal-architecture-pattern) 

---

## Installation

```bash
$ npm install
```

---

## Running the app

```bash
$ npm run start:docker
```

---

## Test

```bash
# unit tests
$ npm run test:docker

# integration tests
$ npm run test:integration:docker

# test coverage
$ npm run test:cov:docker
```
---

## Docker and Local Environment Configuration

### 1 - Rename ```.env-example``` file to  ```.env``` 

### 2 - Run ```docker-compose``` to set a new local MongoDB and up API.

```bash
# run docker-compose (re)building application
$ docker-compose up --build
```

---
## __IMPORTANT NOTICE:__ 
### __Never commit file ```.env``` with sensitive data.__ 

---

## Access API (swagger)

The API Swagger documentation is exposed at [http://localhost:3000/api](http://localhost:3000/api). 

---