-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('SEND', 'DELIVERED', 'READ');

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "status" "public"."MessageStatus" NOT NULL DEFAULT 'SEND';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "is_online" BOOLEAN NOT NULL DEFAULT false;
