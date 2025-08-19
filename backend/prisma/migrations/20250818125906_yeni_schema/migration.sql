/*
  Warnings:

  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupportAgent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Messages" DROP CONSTRAINT "Messages_reciever_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Messages" DROP CONSTRAINT "Messages_sender_id_fkey";

-- DropIndex
DROP INDEX "public"."Image_hotel_id_key";

-- AlterTable
ALTER TABLE "public"."Hotel" ADD COLUMN     "description" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Image" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "total_price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "public"."Messages";

-- DropTable
DROP TABLE "public"."SupportAgent";

-- CreateTable
CREATE TABLE "public"."Chat" (
    "chat_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "public"."ChatParticipant" (
    "participant_id" SERIAL NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatParticipant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "message_id" SERIAL NOT NULL,
    "chat_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("message_id")
);

-- AddForeignKey
ALTER TABLE "public"."ChatParticipant" ADD CONSTRAINT "ChatParticipant_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatParticipant" ADD CONSTRAINT "ChatParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."Chat"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
