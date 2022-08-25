/*
  Warnings:

  - Changed the type of `type` on the `Deck` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeckType" AS ENUM ('STANDARD', 'STRIPPED');

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "type",
ADD COLUMN     "type" "DeckType" NOT NULL;

-- DropEnum
DROP TYPE "Completeness";
