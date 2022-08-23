/*
  Warnings:

  - Added the required column `code` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deckId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suit` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "deckId" INTEGER NOT NULL,
ADD COLUMN     "suit" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
