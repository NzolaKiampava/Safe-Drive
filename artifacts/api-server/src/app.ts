import path from "node:path";
import fs from "node:fs";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const publicPath = path.resolve(process.cwd(), "../safedrive/dist");
try {
  const files = fs.readdirSync(publicPath);
  logger.info({ publicPath, files }, "Static directory content");
} catch (err) {
  logger.error({ err, publicPath }, "Could not read static directory");
}

app.use(express.static(publicPath));

app.use((req, res, next) => {
  const url = req.originalUrl || req.url;
  logger.info({ url, path: req.path }, "Catch-all reached");

  // If the request is for an API route that wasn't handled, return 404 JSON
  if (url.startsWith("/api")) {
    logger.warn({ url }, "API route not found, returning 404 JSON");
    return res.status(404).json({ 
      message: "API route not found",
      path: url
    });
  }

  // Otherwise, serve the frontend index.html
  res.sendFile(path.join(publicPath, "index.html"), (err) => {
    if (err) {
      logger.error({ err, publicPath }, "Error sending index.html");
      res.status(500).send("Error loading frontend");
    }
  });
});

export default app;
