import { db } from "@acme/db/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

const authServerRepo = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    password: {
      hash: (input: string) => Bun.password.hash(input),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});

export { authServerRepo };
