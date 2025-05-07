import { Pool } from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Mock database configuration
export const pool = {
  query: async () => ({ rows: [] }),
  connect: async () => ({}),
  end: async () => {},
} as unknown as Pool;

// Create a mock drizzle instance
export const db = drizzle(pool, { schema });
