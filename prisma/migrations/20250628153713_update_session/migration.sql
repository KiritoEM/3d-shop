/*
  Warnings:

  - You are about to drop the column `userId` on the `session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "userId";
