/*
  Warnings:

  - The `amenities` column on the `Hotel` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Amenity" AS ENUM ('FREE_CANCELLATION', 'BREAKFAST', 'PARKING');

-- AlterTable
ALTER TABLE "public"."Hotel" DROP COLUMN "amenities",
ADD COLUMN     "amenities" "public"."Amenity"[];
