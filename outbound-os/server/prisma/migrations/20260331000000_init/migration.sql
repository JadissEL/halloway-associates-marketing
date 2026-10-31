-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('draft', 'running', 'paused', 'completed');
CREATE TYPE "CampaignChannel" AS ENUM ('email');
CREATE TYPE "LeadStatus" AS ENUM ('new', 'enriched', 'queued', 'contacted', 'replied', 'hot', 'unsubscribed', 'bounced', 'archived');
CREATE TYPE "CampaignLeadStatus" AS ENUM ('pending', 'queued', 'sent', 'replied', 'bounced', 'unsubscribed', 'failed', 'skipped');
CREATE TYPE "OutboxStatus" AS ENUM ('scheduled', 'sending', 'sent', 'failed', 'cancelled', 'dry_run_sent');
CREATE TYPE "ReplyClassification" AS ENUM ('interested', 'question', 'not_interested', 'unsubscribe', 'bounce', 'ooo', 'unknown');
CREATE TYPE "PipelineStage" AS ENUM ('new_reply', 'hot', 'audit_booked', 'proposal_sent', 'won', 'lost');
CREATE TYPE "SuppressionType" AS ENUM ('email', 'domain', 'phone');
CREATE TYPE "MailboxProvider" AS ENUM ('dry_run', 'resend', 'smtp');

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkspaceSettings" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL DEFAULT 'LocalPresence',
    "founderName" TEXT NOT NULL DEFAULT '{{FOUNDER_NAME}}',
    "contactEmail" TEXT NOT NULL DEFAULT '{{EMAIL}}',
    "contactPhone" TEXT NOT NULL DEFAULT '{{PHONE}}',
    "defaultCity" TEXT NOT NULL DEFAULT '{{CITY}}',
    "dryRun" BOOLEAN NOT NULL DEFAULT true,
    "warmUpMode" BOOLEAN NOT NULL DEFAULT true,
    "maxEmailsPerDay" INTEGER NOT NULL DEFAULT 40,
    "requireWebsite" BOOLEAN NOT NULL DEFAULT false,
    "excludeFreeEmailDomains" BOOLEAN NOT NULL DEFAULT false,
    "openaiConfigured" BOOLEAN NOT NULL DEFAULT false,
    "resendConfigured" BOOLEAN NOT NULL DEFAULT false,
    "smtpConfigured" BOOLEAN NOT NULL DEFAULT false,
    "googlePlacesConfigured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "WorkspaceSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Mailbox" (
    "id" TEXT NOT NULL,
    "fromName" TEXT NOT NULL,
    "fromEmail" TEXT NOT NULL,
    "provider" "MailboxProvider" NOT NULL DEFAULT 'dry_run',
    "dailyCap" INTEGER NOT NULL DEFAULT 40,
    "warmUp" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Mailbox_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "instagram" TEXT,
    "googleMapsUrl" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicListingUrl" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "enrichmentJson" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Sequence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Sequence_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SequenceStep" (
    "id" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "delayDays" INTEGER NOT NULL DEFAULT 0,
    "subjectTemplate" TEXT NOT NULL,
    "bodyTemplate" TEXT NOT NULL,
    "subjectB" TEXT,
    "channel" TEXT NOT NULL DEFAULT 'email',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SequenceStep_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'draft',
    "channel" "CampaignChannel" NOT NULL DEFAULT 'email',
    "dailyLimit" INTEGER NOT NULL DEFAULT 20,
    "startAt" TIMESTAMP(3),
    "mailboxId" TEXT NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CampaignLead" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "status" "CampaignLeadStatus" NOT NULL DEFAULT 'pending',
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "lastSentAt" TIMESTAMP(3),
    "nextScheduledAt" TIMESTAMP(3),
    "personalizedJson" JSONB,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CampaignLead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OutboxMessage" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "campaignLeadId" TEXT NOT NULL,
    "mailboxId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "toEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "bodyHtml" TEXT NOT NULL,
    "bodyText" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3),
    "providerId" TEXT,
    "status" "OutboxStatus" NOT NULL DEFAULT 'scheduled',
    "error" TEXT,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "OutboxMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "campaignLeadId" TEXT,
    "outboxMessageId" TEXT,
    "rawText" TEXT NOT NULL,
    "classification" "ReplyClassification" NOT NULL DEFAULT 'unknown',
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "suggestedReply" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PipelineItem" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "replyId" TEXT,
    "stage" "PipelineStage" NOT NULL DEFAULT 'new_reply',
    "notes" TEXT,
    "nextActionAt" TIMESTAMP(3),
    "suggestedReply" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PipelineItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Suppression" (
    "id" TEXT NOT NULL,
    "type" "SuppressionType" NOT NULL,
    "value" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Suppression_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorEmail" TEXT,
    "action" TEXT NOT NULL,
    "meta" JSONB,
    "campaignId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Mailbox_fromEmail_key" ON "Mailbox"("fromEmail");
CREATE INDEX "Lead_niche_city_idx" ON "Lead"("niche", "city");
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
CREATE INDEX "Lead_status_idx" ON "Lead"("status");
CREATE UNIQUE INDEX "SequenceStep_sequenceId_order_key" ON "SequenceStep"("sequenceId", "order");
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");
CREATE UNIQUE INDEX "CampaignLead_campaignId_leadId_key" ON "CampaignLead"("campaignId", "leadId");
CREATE INDEX "CampaignLead_status_idx" ON "CampaignLead"("status");
CREATE UNIQUE INDEX "OutboxMessage_idempotencyKey_key" ON "OutboxMessage"("idempotencyKey");
CREATE INDEX "OutboxMessage_status_scheduledAt_idx" ON "OutboxMessage"("status", "scheduledAt");
CREATE INDEX "OutboxMessage_mailboxId_sentAt_idx" ON "OutboxMessage"("mailboxId", "sentAt");
CREATE UNIQUE INDEX "PipelineItem_replyId_key" ON "PipelineItem"("replyId");
CREATE INDEX "PipelineItem_stage_idx" ON "PipelineItem"("stage");
CREATE UNIQUE INDEX "Suppression_type_value_key" ON "Suppression"("type", "value");
CREATE INDEX "Suppression_value_idx" ON "Suppression"("value");
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

ALTER TABLE "SequenceStep" ADD CONSTRAINT "SequenceStep_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "Sequence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_mailboxId_fkey" FOREIGN KEY ("mailboxId") REFERENCES "Mailbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "Sequence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CampaignLead" ADD CONSTRAINT "CampaignLead_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CampaignLead" ADD CONSTRAINT "CampaignLead_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OutboxMessage" ADD CONSTRAINT "OutboxMessage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OutboxMessage" ADD CONSTRAINT "OutboxMessage_campaignLeadId_fkey" FOREIGN KEY ("campaignLeadId") REFERENCES "CampaignLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OutboxMessage" ADD CONSTRAINT "OutboxMessage_mailboxId_fkey" FOREIGN KEY ("mailboxId") REFERENCES "Mailbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OutboxMessage" ADD CONSTRAINT "OutboxMessage_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "SequenceStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_campaignLeadId_fkey" FOREIGN KEY ("campaignLeadId") REFERENCES "CampaignLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_outboxMessageId_fkey" FOREIGN KEY ("outboxMessageId") REFERENCES "OutboxMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PipelineItem" ADD CONSTRAINT "PipelineItem_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PipelineItem" ADD CONSTRAINT "PipelineItem_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
