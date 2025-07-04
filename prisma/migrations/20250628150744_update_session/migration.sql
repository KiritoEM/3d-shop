/*
  Warnings:

  - You are about to drop the column `sessionToken` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `token` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "session_sessionToken_key";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "sessionToken",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");
