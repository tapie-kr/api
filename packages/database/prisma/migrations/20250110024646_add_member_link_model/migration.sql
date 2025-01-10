-- CreateTable
CREATE TABLE "MemberLink" (
    "id" SERIAL NOT NULL,
    "memberUUID" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberLink_memberUUID_label_key" ON "MemberLink"("memberUUID", "label");

-- CreateIndex
CREATE UNIQUE INDEX "MemberLink_label_link_key" ON "MemberLink"("label", "link");

-- AddForeignKey
ALTER TABLE "MemberLink" ADD CONSTRAINT "MemberLink_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
