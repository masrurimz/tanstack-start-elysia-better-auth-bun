import cors from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authService } from "./services/auth-service";

import { count } from "~/features/count/count-routes";
import { message } from "~/features/message/message-routes";
import { pokemon } from "~/features/pokemon/pokemon-routes";
import { edenTreaty } from "@elysiajs/eden";

export const app = new Elysia()
	.use(cors())
	.use(opentelemetry())
	.use(
		swagger({
			documentation: {
				info: {
					title: "Pokemon API",
					version: "1.0.0",
					description: "API for voting and managing Pokemon data",
					contact: {
						name: "API Support",
						email: "support@pokemon-api.com",
					},
				},
				tags: [
					{
						name: "Pokemon",
						description: "Pokemon related endpoints",
					},
					{
						name: "Messages",
						description: "Message management endpoints",
					},
					{
						name: "Count",
						description: "Count related endpoints",
					},
					{
						name: "Auth",
						description: "Authentication related endpoints",
					},
				],
				components: {
					securitySchemes: {
						bearerAuth: {
							type: "http",
							scheme: "bearer",
							bearerFormat: "JWT",
						},
					},
				},
			},
		}),
	)
	.onError(({ error, code }) => {
		if (code === "NOT_FOUND") return "Not Found :(";

		console.error(error);
	})
	.use(authService)
	.get("/", ({ path }) => `Hello Elysia from ${path}`)
	.get("health", () => "OK")
	.use(count) // New implementation
	.use(pokemon)
	.use(message);

export type App = typeof app;

export type { Session } from "~/libs/better-auth/session";
