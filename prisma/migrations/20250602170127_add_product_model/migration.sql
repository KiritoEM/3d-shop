-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "config3D" JSONB NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "modelPath" TEXT NOT NULL,
    "groundColor" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
