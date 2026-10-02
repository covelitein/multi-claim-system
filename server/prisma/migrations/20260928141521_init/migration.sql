-- CreateEnum
CREATE TYPE "public"."FacilityType" AS ENUM ('alf', 'snf', 'home_health', 'agency');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'billing_manager', 'staff');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "public"."ResidentStatus" AS ENUM ('active', 'inactive', 'pending', 'on_hold');

-- CreateEnum
CREATE TYPE "public"."ClaimStatus" AS ENUM ('in_progress', 'missing_docs', 'ready_for_review', 'submitted', 'denied', 'paid');

-- CreateEnum
CREATE TYPE "public"."InvoiceStatus" AS ENUM ('matched', 'pending_review', 'missing', 'overdue');

-- CreateEnum
CREATE TYPE "public"."DocumentOwnerType" AS ENUM ('claim', 'invoice');

-- CreateTable
CREATE TABLE "public"."Facility" (
    "id" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "type" "public"."FacilityType" NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'Professional',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'admin',
    "status" "public"."UserStatus" NOT NULL DEFAULT 'active',
    "image" TEXT,
    "facilityId" TEXT NOT NULL,
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resident" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "payer" TEXT NOT NULL,
    "room" TEXT,
    "status" "public"."ResidentStatus" NOT NULL DEFAULT 'active',
    "admitDate" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Claim" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "insurer" TEXT NOT NULL,
    "billingPeriod" TEXT NOT NULL,
    "status" "public"."ClaimStatus" NOT NULL DEFAULT 'in_progress',
    "missingItems" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "amountCents" INTEGER NOT NULL DEFAULT 0,
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoice" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "residentId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "servicePeriod" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "status" "public"."InvoiceStatus" NOT NULL DEFAULT 'pending_review',
    "matchedClaimId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "lastContacted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeamInvite" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'staff',
    "token" TEXT NOT NULL,
    "invitedById" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "ownerType" "public"."DocumentOwnerType" NOT NULL,
    "ownerId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Resident_facilityId_idx" ON "public"."Resident"("facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_facilityId_residentId_key" ON "public"."Resident"("facilityId", "residentId");

-- CreateIndex
CREATE INDEX "Claim_facilityId_idx" ON "public"."Claim"("facilityId");

-- CreateIndex
CREATE INDEX "Claim_status_idx" ON "public"."Claim"("status");

-- CreateIndex
CREATE INDEX "Invoice_facilityId_idx" ON "public"."Invoice"("facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_facilityId_invoiceId_key" ON "public"."Invoice"("facilityId", "invoiceId");

-- CreateIndex
CREATE INDEX "Contact_facilityId_idx" ON "public"."Contact"("facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamInvite_token_key" ON "public"."TeamInvite"("token");

-- CreateIndex
CREATE INDEX "TeamInvite_facilityId_idx" ON "public"."TeamInvite"("facilityId");

-- CreateIndex
CREATE INDEX "Document_facilityId_idx" ON "public"."Document"("facilityId");

-- CreateIndex
CREATE INDEX "Document_ownerType_ownerId_idx" ON "public"."Document"("ownerType", "ownerId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "public"."Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resident" ADD CONSTRAINT "Resident_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "public"."Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Claim" ADD CONSTRAINT "Claim_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "public"."Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Claim" ADD CONSTRAINT "Claim_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "public"."Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "public"."Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "public"."Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_matchedClaimId_fkey" FOREIGN KEY ("matchedClaimId") REFERENCES "public"."Claim"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "public"."Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamInvite" ADD CONSTRAINT "TeamInvite_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "public"."Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamInvite" ADD CONSTRAINT "TeamInvite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "public"."Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
