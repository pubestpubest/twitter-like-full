import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { url, super_url } from "./url";
import * as schema from "./schema";

export const pool = new Pool({ connectionString: url });
export const superPool = new Pool({ connectionString: super_url });

export const drizzlePool = drizzle(pool, { schema, logger: true });
export const drizzleSuperPool = drizzle(superPool, { schema, logger: true });

console.log("✅ Database connected successfully!");
