import { createAuthClient } from 'better-auth/react'

const baseURL = process.env.BETTER_AUTH_URL

const authClient = createAuthClient({
	baseURL: 'http://localhost:3001',
})

export { authClient }
