import net from "node:net";

const host = process.env.PGHOST || "127.0.0.1";
const port = Number(process.env.PGPORT || 5433);
const timeoutMs = 60_000;

function check() {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });
}

const start = Date.now();
while (Date.now() - start < timeoutMs) {
  if (await check()) {
    console.log(`Postgres reachable at ${host}:${port}`);
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 1000));
}
console.error("Timed out waiting for Postgres");
process.exit(1);
