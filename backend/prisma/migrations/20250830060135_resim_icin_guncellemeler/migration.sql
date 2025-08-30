/*
  Warnings:

  - Added the required column `storage_path` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Hotel" ADD COLUMN     "main_image_path" TEXT,
ADD COLUMN     "main_image_url" TEXT;

-- AlterTable
ALTER TABLE "public"."Image" ADD COLUMN     "storage_path" TEXT NOT NULL;
