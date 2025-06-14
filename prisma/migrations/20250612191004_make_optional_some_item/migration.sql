-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "stripePaymentIntentId" DROP NOT NULL,
ALTER COLUMN "stripeChargeId" DROP NOT NULL;
