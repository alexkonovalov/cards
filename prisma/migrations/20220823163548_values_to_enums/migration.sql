/*
  Warnings:

  - You are about to drop the column `code` on the `Card` table. All the data in the column will be lost.
  - Changed the type of `value` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `uuid` was added to the `Deck` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `type` on the `Deck` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Completeness" AS ENUM ('FULL', 'SHORT');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'JACK', 'QUEEN', 'KING', 'ACE');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "code",
DROP COLUMN "value",
ADD COLUMN     "value" "Rank" NOT NULL;

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "Completeness" NOT NULL;
