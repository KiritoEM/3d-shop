/*
  Warnings:

  - Made the column `config3D` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "config3D" SET NOT NULL,
ALTER COLUMN "config3D" SET DEFAULT '{"rotation": [0, 0, 0], "scale": 1, "position": [0, 0, 0]}';
