import Elysia from "elysia";
import { auth } from "~/libs/better-auth/server";

// user middleware (compute user and session and pass to routes)
const betterAuthMiddleware = new Elysia({ name: "better-auth" })
	.mount(auth.handler)
	.macro({
		auth: {
			async resolve({ error, request: { headers } }) {
				const session = await auth.api.getSession({
					headers,
				});

				if (!session)
					return error(401, {
						success: false,
						message:
							"Unauthorized: Please check your credentials and permissions",
					});

				return {
					user: session.user,
					session: session.session,
				};
			},
		},
	});

export { betterAuthMiddleware };
