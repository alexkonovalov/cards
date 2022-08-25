import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

const REGEX_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const FULL_DECK_SIZE = 52;

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    await app.init();
  });

  it('should create new deck', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/deck/create')
      .send({ type: 'FULL', shuffled: false })
      .expect(201);

    expect(body).toMatchObject({
      shuffled: false,
      type: 'FULL',
      remaining: FULL_DECK_SIZE,
    });

    expect(body.deckId).toMatch(REGEX_UUID);
  });

  describe('given deck is created', () => {
    let createdDeckId: string;

    beforeEach(async () => {
      const {
        body: { deckId },
      } = await request(app.getHttpServer())
        .post('/deck/create')
        .send({ type: 'FULL', shuffled: false })
        .expect(201);

      createdDeckId = deckId;
    });

    it('should draw 2 cards', async () => {
      const { body } = await request(app.getHttpServer())
        .put(`/deck/draw/${createdDeckId}`)
        .send({ count: 2 })
        .expect(200);

      expect(body.cards).toEqual([
        { value: 'ACE', code: 'AD', suit: 'DIAMONDS' },
        { value: 'ACE', code: 'AH', suit: 'HEARTS' },
      ]);
    });

    it('should open a deck', async () => {
      const {
        body: { cards, remaining, deckId },
      } = await request(app.getHttpServer())
        .get(`/deck/open/${createdDeckId}`)
        .expect(200);

      expect(cards).toBeDefined();
      expect(remaining).toBe(FULL_DECK_SIZE);
      expect(cards.length).toBe(FULL_DECK_SIZE);
      expect(deckId).toEqual(createdDeckId);
    });
  });
});
