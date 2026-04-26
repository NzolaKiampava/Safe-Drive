import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // Keep-alive mechanism for Render free tier
  const KEEP_ALIVE_URL = "https://safe-drive-qtpn.onrender.com/api/healthz";
  const KEEP_ALIVE_INTERVAL = 10 * 60 * 1000; // 10 minutes

  setInterval(() => {
    fetch(KEEP_ALIVE_URL)
      .then((res) => logger.info({ status: res.status }, "Keep-alive ping successful"))
      .catch((err) => logger.error({ err }, "Keep-alive ping failed"));
  }, KEEP_ALIVE_INTERVAL);
});
