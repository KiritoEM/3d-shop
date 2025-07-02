/*
  Warnings:

  - Added the required column `deviceInfo` to the `admin_facial_recognition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SessionMethod" AS ENUM ('FACIAL_RECOGNITION', 'FORM');

-- AlterTable
ALTER TABLE "admin_facial_recognition" ADD COLUMN     "deviceInfo" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "method" "SessionMethod" NOT NULL DEFAULT 'FACIAL_RECOGNITION';
