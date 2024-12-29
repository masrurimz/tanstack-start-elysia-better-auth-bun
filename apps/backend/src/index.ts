import cors from '@elysiajs/cors'
import { opentelemetry } from '@elysiajs/opentelemetry'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { note } from './note'
import { user } from './user'
import { countRoutes } from './count'
import { pokemonRoutes } from './pokemon'

const app = new Elysia()
	.use(cors())
	.use(opentelemetry())
	.use(swagger())
	.onError(({ error, code }) => {
		if (code === 'NOT_FOUND') return 'Not Found :('

		console.error(error)
	})
	.get('/', ({ path }) => `Hello Elysia from ${path}`)
	.get('health', () => 'OK')
	.use(note)
	.use(user)
	.use(countRoutes)
	.use(pokemonRoutes)
	.listen(3001)

export type App = typeof app

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)
