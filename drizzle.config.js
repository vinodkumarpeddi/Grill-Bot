import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_6O1rQXIqTERC@ep-twilight-union-a5cnbqms-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'
  },
});