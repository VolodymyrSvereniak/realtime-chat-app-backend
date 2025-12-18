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
  CLOUDINARY_CLOUD_NAME: z.string().min(1, {
    error: "CLOUDINARY_CLOUD_NAME is required and must be a string",
  }),
  CLOUDINARY_API_KEY: z.string().min(1, {
    error: "CLOUDINARY_API_KEY is required and must be a string",
  }),
  CLOUDINARY_API_SECRET: z.string().min(1, {
    error: "CLOUDINARY_API_SECRET is required and must be a string",
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
