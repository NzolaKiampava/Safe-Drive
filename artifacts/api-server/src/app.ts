import path from "node:path";
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
logger.info({ publicPath }, "Serving static files from");

app.use(express.static(publicPath));

app.use((req, res, next) => {
  // If the request is for an API route that wasn't handled, return 404
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  // Otherwise, serve the frontend index.html
  res.sendFile(path.join(publicPath, "index.html"));
});

export default app;
