-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_formResponseUUID_fkey";

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_memberUUID_fkey" FOREIGN KEY ("memberUUID") REFERENCES "Member"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
