/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."HotelCategory" AS ENUM ('HOTEL', 'VILLA', 'APART', 'HOSTEL', 'BUNGALOV', 'PANSION');

-- DropForeignKey
ALTER TABLE "public"."Rating" DROP CONSTRAINT "Rating_hotel_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Rating" DROP CONSTRAINT "Rating_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Hotel" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "category" "public"."HotelCategory",
ADD COLUMN     "checkIn" TEXT,
ADD COLUMN     "checkOut" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "facilities" TEXT[],
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "policies" TEXT[],
ADD COLUMN     "stars" INTEGER,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "public"."Rating";

-- CreateTable
CREATE TABLE "public"."Review" (
    "review_id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_user_id_hotel_id_key" ON "public"."Review"("user_id", "hotel_id");

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "public"."Hotel"("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
