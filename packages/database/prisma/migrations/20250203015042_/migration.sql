-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('ANNOUNCEMENT', 'MESSAGE');

-- CreateTable
CREATE TABLE "Notification" (
    "uuid" TEXT NOT NULL,
    "assetUUID" TEXT,
    "content" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_assetUUID_fkey" FOREIGN KEY ("assetUUID") REFERENCES "Asset"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
