import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const result = await prisma.outboxMessage.updateMany({
  where: { status: "scheduled", scheduledAt: { gt: new Date() } },
  data: { scheduledAt: new Date(), error: null },
});
console.log(`reset ${result.count} messages to due now`);
await prisma.$disconnect();
