import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate =
  <T extends z.ZodTypeAny>(schema: T, source: "body" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    const data = source === "body" ? req.body : req.params;
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = (result.error as ZodError).issues.map((err) => ({
        field: err.path.join(".") || "root",
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }

    if (source === "body") {
      req.body = result.data;
    } else {
      Object.assign(req.params, result.data);
    }

    next();
  };
