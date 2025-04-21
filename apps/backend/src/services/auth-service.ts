import type { Context } from "elysia";
import { Elysia } from "elysia";
import { auth } from "~/libs/better-auth/server";

const betterAuthView = (context: Context & { request: Request }) => {
	const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
	// validate request method
	if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
		return auth.handler(context.request);
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		context.error(405);
	}
};

const authService = new Elysia().all("/api/auth/*", betterAuthView);

export { authService };
