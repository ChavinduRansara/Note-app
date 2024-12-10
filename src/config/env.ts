import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
} as const;

try {
  envSchema.parse(env);
} catch (error) {
  console.error('Invalid environment variables:', error);
  throw new Error('Invalid environment variables');
}

export default env;