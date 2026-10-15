import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY is required'),
  ANTHROPIC_MODEL: z.string().default('claude-sonnet-4-5-20250929'),
  GITHUB_TOKEN: z.string().min(1, 'GITHUB_TOKEN is required'),
  PROJECT_ROOT: z.string().default(process.cwd()),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info')
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid environment configuration:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }
  return result.data;
}

export const env = validateEnv();
