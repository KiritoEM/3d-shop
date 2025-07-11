-- AlterTable
ALTER TABLE "admin_facial_recognition" ALTER COLUMN "deviceInfo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "adminId" TEXT;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
