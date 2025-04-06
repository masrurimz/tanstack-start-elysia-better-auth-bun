import "dotenv/config";

import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export default {
  out: "./migrations",
  schema: "./src/schema.ts",
  breakpoints: true,
  dialect: "sqlite",
  // Set driver only if you are using aws-data-api, turso, d1-http, or expo
  // driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    // token: process.env.DATABASE_AUTH_TOKEN,
  },
  tablesFilter: ["!libsql_wasm_func_table"],
  verbose: true,
} satisfies Config;
