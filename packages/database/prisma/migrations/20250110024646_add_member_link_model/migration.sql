-- CreateTable
CREATE TABLE "MemberProfile" (
    "id" SERIAL NOT NULL,
    "memberUUID" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_memberUUID_label_key" ON "MemberProfile"("memberUUID", "label");

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_label_link_key" ON "MemberProfile"("label", "link");

-- AddForeignKey
ALTER TABLE "MemberProfile" ADD CONSTRAINT "MemberProfile_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
