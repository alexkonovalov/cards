-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
