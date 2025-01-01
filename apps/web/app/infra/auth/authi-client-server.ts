import { createServerFn } from '@tanstack/start'
import type { Session } from 'backend-client'
import { createAuthClient } from 'better-auth/client'
import { getHeader } from 'vinxi/http'

const baseURL = process.env.BETTER_AUTH_URL

const authClientServer = createAuthClient({
	baseURL: 'http://localhost:3001',
})

/**
 * Fetch the session from the server using serverFn, bcs loaderFn is executed both on the server and the client
 */
const fetchSessionFn = createServerFn({ method: 'GET' }).handler(async () => {
	const res = await fetch('http://localhost:3001/api/auth/get-session', {
		headers: {
			//get the cookie from the request
			cookie: getHeader('cookie') || '',
		},
	})

	if (!res.ok) {
		throw new Error('Not authenticated')
	}

	const session = (await res.json()) as Session

	return session
})

export { authClientServer, fetchSessionFn }
