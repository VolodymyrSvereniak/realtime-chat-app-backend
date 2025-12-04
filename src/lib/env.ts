import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  CLIENT_URL: z.url({
    error: "CLIENT_URL must be a valid URL",
  }),
  DATABASE_URL: z.url({
    error: "DATABASE_URL must be a valid URL",
  }),

  NODE_ENV: z
    .enum(["development", "production"], {
      error: "NODE_ENV must be either development or production",
    })
    .default("development"),

  JWT_SECRET: z.string().min(1, {
    error: "JWT_SECRET is required and must be a string",
  }),
  RESEND_API_KEY: z.string().min(1, {
    error: "RESEND_API_KEY is required",
  }),

  EMAIL_FROM: z.email({
    error: "EMAIL_FROM must be a valid email address",
  }),

  EMAIL_FROM_NAME: z.string().min(1, {
    error: "EMAIL_FROM_NAME is required",
  }),
});

export type Env = z.infer<typeof envSchema>;

const parseEnv = (): Env => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variables:");
    const flattened = z.flattenError(result.error);
    console.error(JSON.stringify(flattened, null, 2));
    throw new Error("Invalid environment variables");
  }

  return result.data;
};

export const env = parseEnv();
