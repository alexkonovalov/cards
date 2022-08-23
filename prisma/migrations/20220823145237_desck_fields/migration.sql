/*
  Warnings:

  - Added the required column `shuffled` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "shuffled" BOOLEAN NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
