/*
  Warnings:

  - You are about to drop the column `rating` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Hotel" DROP COLUMN "rating",
ADD COLUMN     "rating_avg" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rating_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "special_requests" TEXT;

-- CreateTable
CREATE TABLE "public"."Rating" (
    "rating_id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("rating_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_user_id_hotel_id_key" ON "public"."Rating"("user_id", "hotel_id");

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "public"."Hotel"("hotel_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
