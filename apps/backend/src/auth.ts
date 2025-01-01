import { db } from '@acme/db/client'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { openAPI } from 'better-auth/plugins'
import Elysia, { type Context } from 'elysia'

const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite', // or "mysql", "sqlite"
	}),
	plugins: [openAPI()],
	emailAndPassword: {
		enabled: true,
		password: {
			hash: Bun.password.hash,
			verify: ({ password, hash }) => Bun.password.verify(password, hash),
		},
	},
	trustedOrigins: ['http://localhost:3000'],
})

const betterAuthView = (context: Context) => {
	const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET']
	// validate request method
	if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
		return auth.handler(context.request)
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		context.error(405)
	}
}

const authService = new Elysia().all('/api/auth/*', betterAuthView)

export { authService, auth, betterAuthView }
