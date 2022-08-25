## Description

Card Deck basic API

## Methods Supported

### 1. Create a deck of cards

```
POST /deck
```

#### Examples:

stretched & shuffled deck:

```bash
curl --location --request POST 'localhost:3333/deck/create' \
--header 'Content-Type: application/json' \
--data-raw '{ "type": "SHORT", "shuffled": true }
'
```

full & unshuffled deck:

```bash
curl --location --request POST 'localhost:3333/deck/create' \
--header 'Content-Type: application/json' \
--data-raw '{ "type": "FULL", "shuffled": false }
'
```

### 2. Open a deck

```
GET  /deck/open
```

#### Examples:

Open deck with uuid `9ccb8d2a-da51-42e8-a06a-cf5910689ed7`

```bash
curl --location --request GET 'localhost:3333/deck/open/9ccb8d2a-da51-42e8-a06a-cf5910689ed7'
```

### 3. Draw from a deck

```
PUT  /deck/draw
```

#### Examples:

Draw 7 cards from deck with uuid `9ccb8d2a-da51-42e8-a06a-cf5910689ed7`

```bash
curl --location --request PUT 'localhost:3333/deck/draw/9ccb8d2a-da51-42e8-a06a-cf5910689ed7' \
--header 'Content-Type: application/json' \
--data-raw '{
    "count": 7
}'
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Creator

[Alexander Konovalov](https://github.com/alexkonovalov)

## Build with [NestJS](https://nestjs.com/)

<p align="left">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
