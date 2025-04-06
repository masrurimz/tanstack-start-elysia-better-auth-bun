import cors from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import type { auth } from "./auth";
import { authService } from "./auth";
import { note } from "./note";
import { user } from "./user";

// For backwards compatibility, keep the old routes until fully migrated
import { countRoutes } from "./count";
import { pokemon } from "./features/pokemon/pokemon-routes";
import { messageService as oldMessageService } from "./message";

const app = new Elysia()
	.use(cors())
	.use(opentelemetry())
	.use(swagger())
	.onError(({ error, code }) => {
		if (code === "NOT_FOUND") return "Not Found :(";

		console.error(error);
	})
	.use(authService)
	.get("/", ({ path }) => `Hello Elysia from ${path}`)
	.get("health", () => "OK")
	// Legacy routes - to be removed once migration is complete
	.use(oldMessageService)
	.use(note)
	.use(user)
	.use(countRoutes)
	// .use(pokemonRoutes)
	// Clean architecture, feature-based routes
	.use(pokemon)
	.listen(3001);

export type App = typeof app;
export type Session = typeof auth.$Infer.Session;

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
