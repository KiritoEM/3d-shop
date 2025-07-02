/*
  Warnings:

  - You are about to drop the `AdminFacialRecognition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AdminFacialRecognition";

-- CreateTable
CREATE TABLE "admin_facial_recognition" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_facial_recognition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_facial_recognition_adminId_key" ON "admin_facial_recognition"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_facial_recognition_id_adminId_key" ON "admin_facial_recognition"("id", "adminId");

-- AddForeignKey
ALTER TABLE "admin_facial_recognition" ADD CONSTRAINT "admin_facial_recognition_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
