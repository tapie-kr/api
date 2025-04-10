-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('MANAGER', 'CO_MANAGER', 'MEMBER');

-- CreateEnum
CREATE TYPE "MemberUnit" AS ENUM ('DEVELOPER', 'DESIGNER');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('ACTIVE', 'GRADUATED');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FormOptionType" AS ENUM ('TEXT', 'PARAGRAPH', 'RADIO', 'CHECKBOX', 'SELECT', 'FILE');

-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('FULL', 'READ', 'WRITE', 'DELETE', 'NONE');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('VISIBLE', 'HIDDEN');

-- CreateTable
CREATE TABLE "Account" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Member" (
    "uuid" TEXT NOT NULL,
    "accountUUID" TEXT NOT NULL,
    "cohort" INTEGER NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'MEMBER',
    "unit" "MemberUnit" NOT NULL,
    "status" "MemberStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Member_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Guest" (
    "uuid" TEXT NOT NULL,
    "accountUUID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Asset" (
    "uuid" TEXT NOT NULL,
    "prettyName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Award" (
    "uuid" TEXT NOT NULL,
    "competitionUUID" TEXT NOT NULL,
    "prettyName" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE',
    "awardedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Award_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Competition" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Class" (
    "uuid" TEXT NOT NULL,
    "classroomUUID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Class_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "uuid" TEXT NOT NULL,
    "classroomUUID" TEXT NOT NULL,
    "classUUID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Form" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Form_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "FormSection" (
    "uuid" TEXT NOT NULL,
    "formUUID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "index" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FormSection_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "FormOption" (
    "uuid" TEXT NOT NULL,
    "sectionUUID" TEXT NOT NULL,
    "type" "FormOptionType" NOT NULL,
    "label" TEXT,
    "description" TEXT,
    "index" INTEGER NOT NULL,
    "placeholder" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FormOption_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "FormResponse" (
    "uuid" TEXT NOT NULL,
    "formUUID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "FormOptionResponse" (
    "uuid" TEXT NOT NULL,
    "optionUUID" TEXT NOT NULL,
    "responseUUID" TEXT NOT NULL,
    "values" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FormOptionResponse_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Interview" (
    "uuid" TEXT NOT NULL,
    "formUUID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE',
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "InterviewApplication" (
    "uuid" TEXT NOT NULL,
    "interviewUUID" TEXT NOT NULL,
    "responseUUID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "InterviewApplication_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Permission" (
    "uuid" TEXT NOT NULL,
    "targetUUID" TEXT NOT NULL,
    "root" BOOLEAN NOT NULL DEFAULT false,
    "account" "PermissionType" NOT NULL DEFAULT 'NONE',
    "announcement" "PermissionType" NOT NULL DEFAULT 'READ',
    "assignment" "PermissionType" NOT NULL DEFAULT 'READ',
    "auditLog" "PermissionType" NOT NULL DEFAULT 'NONE',
    "award" "PermissionType" NOT NULL DEFAULT 'READ',
    "class" "PermissionType" NOT NULL DEFAULT 'READ',
    "classroom" "PermissionType" NOT NULL DEFAULT 'READ',
    "interview" "PermissionType" NOT NULL DEFAULT 'NONE',
    "project" "PermissionType" NOT NULL DEFAULT 'READ',
    "statistics" "PermissionType" NOT NULL DEFAULT 'READ',
    "survey" "PermissionType" NOT NULL DEFAULT 'READ',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Project" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Survey" (
    "uuid" TEXT NOT NULL,
    "formUUID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'VISIBLE',
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SurveyApplication" (
    "uuid" TEXT NOT NULL,
    "surveyUUID" TEXT NOT NULL,
    "responseUUID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SurveyApplication_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_StudentClassroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentClassroom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TeacherClassroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeacherClassroom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AccountToClass" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccountToClass_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AccountToAssignment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccountToAssignment_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AccountToAward" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccountToAward_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AccountToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AccountToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AuthorAnnouncement" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AuthorAnnouncement_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EditorAnnouncement" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EditorAnnouncement_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AssetToFormOptionResponse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AssetToFormOptionResponse_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AnnouncementToAsset" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnnouncementToAsset_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_accountUUID_key" ON "Member"("accountUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_accountUUID_key" ON "Guest"("accountUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Award_prettyName_key" ON "Award"("prettyName");

-- CreateIndex
CREATE UNIQUE INDEX "Competition_name_key" ON "Competition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_formUUID_key" ON "Interview"("formUUID");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewApplication_responseUUID_key" ON "InterviewApplication"("responseUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_targetUUID_key" ON "Permission"("targetUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Survey_formUUID_key" ON "Survey"("formUUID");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyApplication_responseUUID_key" ON "SurveyApplication"("responseUUID");

-- CreateIndex
CREATE INDEX "_StudentClassroom_B_index" ON "_StudentClassroom"("B");

-- CreateIndex
CREATE INDEX "_TeacherClassroom_B_index" ON "_TeacherClassroom"("B");

-- CreateIndex
CREATE INDEX "_AccountToClass_B_index" ON "_AccountToClass"("B");

-- CreateIndex
CREATE INDEX "_AccountToAssignment_B_index" ON "_AccountToAssignment"("B");

-- CreateIndex
CREATE INDEX "_AccountToAward_B_index" ON "_AccountToAward"("B");

-- CreateIndex
CREATE INDEX "_AccountToProject_B_index" ON "_AccountToProject"("B");

-- CreateIndex
CREATE INDEX "_AuthorAnnouncement_B_index" ON "_AuthorAnnouncement"("B");

-- CreateIndex
CREATE INDEX "_EditorAnnouncement_B_index" ON "_EditorAnnouncement"("B");

-- CreateIndex
CREATE INDEX "_AssetToFormOptionResponse_B_index" ON "_AssetToFormOptionResponse"("B");

-- CreateIndex
CREATE INDEX "_AnnouncementToAsset_B_index" ON "_AnnouncementToAsset"("B");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_competitionUUID_fkey" FOREIGN KEY ("competitionUUID") REFERENCES "Competition"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_classroomUUID_fkey" FOREIGN KEY ("classroomUUID") REFERENCES "Classroom"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classroomUUID_fkey" FOREIGN KEY ("classroomUUID") REFERENCES "Classroom"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classUUID_fkey" FOREIGN KEY ("classUUID") REFERENCES "Class"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSection" ADD CONSTRAINT "FormSection_formUUID_fkey" FOREIGN KEY ("formUUID") REFERENCES "Form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormOption" ADD CONSTRAINT "FormOption_sectionUUID_fkey" FOREIGN KEY ("sectionUUID") REFERENCES "FormSection"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_formUUID_fkey" FOREIGN KEY ("formUUID") REFERENCES "Form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormOptionResponse" ADD CONSTRAINT "FormOptionResponse_optionUUID_fkey" FOREIGN KEY ("optionUUID") REFERENCES "FormOption"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormOptionResponse" ADD CONSTRAINT "FormOptionResponse_responseUUID_fkey" FOREIGN KEY ("responseUUID") REFERENCES "FormResponse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_formUUID_fkey" FOREIGN KEY ("formUUID") REFERENCES "Form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewApplication" ADD CONSTRAINT "InterviewApplication_interviewUUID_fkey" FOREIGN KEY ("interviewUUID") REFERENCES "Interview"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewApplication" ADD CONSTRAINT "InterviewApplication_responseUUID_fkey" FOREIGN KEY ("responseUUID") REFERENCES "FormResponse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_targetUUID_fkey" FOREIGN KEY ("targetUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_formUUID_fkey" FOREIGN KEY ("formUUID") REFERENCES "Form"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyApplication" ADD CONSTRAINT "SurveyApplication_surveyUUID_fkey" FOREIGN KEY ("surveyUUID") REFERENCES "Survey"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyApplication" ADD CONSTRAINT "SurveyApplication_responseUUID_fkey" FOREIGN KEY ("responseUUID") REFERENCES "FormResponse"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentClassroom" ADD CONSTRAINT "_StudentClassroom_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentClassroom" ADD CONSTRAINT "_StudentClassroom_B_fkey" FOREIGN KEY ("B") REFERENCES "Classroom"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherClassroom" ADD CONSTRAINT "_TeacherClassroom_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherClassroom" ADD CONSTRAINT "_TeacherClassroom_B_fkey" FOREIGN KEY ("B") REFERENCES "Classroom"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToClass" ADD CONSTRAINT "_AccountToClass_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToClass" ADD CONSTRAINT "_AccountToClass_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToAssignment" ADD CONSTRAINT "_AccountToAssignment_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToAssignment" ADD CONSTRAINT "_AccountToAssignment_B_fkey" FOREIGN KEY ("B") REFERENCES "Assignment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToAward" ADD CONSTRAINT "_AccountToAward_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToAward" ADD CONSTRAINT "_AccountToAward_B_fkey" FOREIGN KEY ("B") REFERENCES "Award"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToProject" ADD CONSTRAINT "_AccountToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToProject" ADD CONSTRAINT "_AccountToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorAnnouncement" ADD CONSTRAINT "_AuthorAnnouncement_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorAnnouncement" ADD CONSTRAINT "_AuthorAnnouncement_B_fkey" FOREIGN KEY ("B") REFERENCES "Announcement"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorAnnouncement" ADD CONSTRAINT "_EditorAnnouncement_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditorAnnouncement" ADD CONSTRAINT "_EditorAnnouncement_B_fkey" FOREIGN KEY ("B") REFERENCES "Announcement"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetToFormOptionResponse" ADD CONSTRAINT "_AssetToFormOptionResponse_A_fkey" FOREIGN KEY ("A") REFERENCES "Asset"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetToFormOptionResponse" ADD CONSTRAINT "_AssetToFormOptionResponse_B_fkey" FOREIGN KEY ("B") REFERENCES "FormOptionResponse"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnnouncementToAsset" ADD CONSTRAINT "_AnnouncementToAsset_A_fkey" FOREIGN KEY ("A") REFERENCES "Announcement"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnnouncementToAsset" ADD CONSTRAINT "_AnnouncementToAsset_B_fkey" FOREIGN KEY ("B") REFERENCES "Asset"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
