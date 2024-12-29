// app/routes/index.tsx
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { api } from 'backend-client'
import { useEffect } from 'react'

export const Route = createFileRoute('/count-elysia')({
	component: Home,
	loader: async () => {
		const response = await api.count.index.get()
		return response.data
	},
})

function Home() {
	const router = useRouter()
	const count = Route.useLoaderData()

	useEffect(() => {
		api.health.get().then((res) => {
			console.log('hello from eden: ' + res.data)
		})
	}, [])

	const handleIncrement = async () => {
		await api.count.increment.post()
		router.invalidate()
	}

	return (
		<button type="button" onClick={handleIncrement}>
			Add 1 to {count}?
		</button>
	)
}
