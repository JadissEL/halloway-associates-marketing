import { env } from "./lib/env.js";
import { initQueue, startWorker } from "./jobs/queue.js";

async function main() {
  await initQueue();
  const stop = startWorker();
  console.info(`[worker] started (SYNC_JOBS=${env.SYNC_JOBS})`);

  const shutdown = () => {
    stop?.();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
