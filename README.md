## Description

Card Deck basic API

## Methods Supported

### 1. Create a deck of cards

```
POST /deck/create
```

#### Examples:

stretched & shuffled deck:

```bash
$ curl --location --request POST 'localhost:3333/deck/create' \
--header 'Content-Type: application/json' \
--data-raw '{ "type": "SHORT", "shuffled": true }
'
```

full & unshuffled deck:

```bash
$ curl --location --request POST 'localhost:3333/deck/create' \
--header 'Content-Type: application/json' \
--data-raw '{ "type": "FULL", "shuffled": false }
'
```

### 2. Open a deck

```
GET  /deck/open
```

#### Examples:

Open deck with deckId `00112233-4455-6677-8899-aabbccddeeff`

```bash
$ curl --location --request GET 'localhost:3333/deck/open/00112233-4455-6677-8899-aabbccddeeff'
```

### 3. Draw from a deck

```
PUT  /deck/draw
```

#### Examples:

Draw 7 cards from deck with deckId `00112233-4455-6677-8899-aabbccddeeff`

```bash
$ curl --location --request PUT 'localhost:3333/deck/draw/00112233-4455-6677-8899-aabbccddeeff' \
--header 'Content-Type: application/json' \
--data-raw '{
    "count": 7
}'
```

## Installation & Prepare environment

NB! `Docker`, `yarn` & `npm` should be already installed on your machine

### First of all

```bash
$ yarn install
```

### To run service DEV mode:

```bash
$ yarn run db:dev:up
$ yarn run db:dev:migrate
$ yarn run start
```

### To test service:

```bash
$ yarn run test
```

### To test e2e:

```bash
$ yarn run test:e2e
```

### To see test coverage:

```bash
$ yarn run test:cov
```

### To stop DB containers:

```bash
$ yarn db:test:rm
$ yarn db:dev:rm

```

## Creator

[Alexander Konovalov](https://github.com/alexkonovalov)

## Built with [NestJS](https://nestjs.com/)

<p align="left">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
