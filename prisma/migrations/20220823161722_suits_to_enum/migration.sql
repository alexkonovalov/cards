/*
  Warnings:

  - Changed the type of `suit` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Suit" AS ENUM ('SPADES', 'CLUBS', 'HEARTS', 'DIAMONDS');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "suit",
ADD COLUMN     "suit" "Suit" NOT NULL;
