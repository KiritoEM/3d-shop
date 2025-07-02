/*
  Warnings:

  - The primary key for the `admin_info` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "admin_info" DROP CONSTRAINT "admin_info_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "admin_info_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "admin_info_id_seq";

-- CreateTable
CREATE TABLE "AdminFacialRecognition" (
    "id" TEXT NOT NULL,

    CONSTRAINT "AdminFacialRecognition_pkey" PRIMARY KEY ("id")
);
