import cors from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { note } from "./note";
import { authService } from "./services/auth-service";
import { user } from "./user";

import { message } from "~/features/message/message-routes";
import { pokemon } from "~/features/pokemon/pokemon-routes";
// For backwards compatibility, keep the old routes until fully migrated
import { countRoutes } from "./count";

const app = new Elysia()
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
						name: "Auth",
						description: "Authentication related endpoints",
					},
					{
						name: "Legacy",
						description: "Legacy endpoints - to be migrated",
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
	// Legacy routes - to be removed once migration is complete
	// .use(oldMessageService) // Deprecated: Use the new message routes from ~/features/message/message-routes.ts
	.use(note)
	.use(user)
	.use(countRoutes)
	// Clean architecture, feature-based routes
	.use(pokemon)
	.use(message)
	.listen(3001);

export type App = typeof app;

export type { Session } from "~/libs/better-auth/session";

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
console.log(
	`📚 Swagger documentation available at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
