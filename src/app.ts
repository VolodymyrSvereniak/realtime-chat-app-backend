import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { env } from "./lib/env";
import { logger } from "./utils/logger";

const app = express();
const PORT = env.PORT;

app.use(express.json());

app.use(cookieParser());

app.use(pinoHttp({ logger }));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err, "Unhandled error");
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

export default app;
