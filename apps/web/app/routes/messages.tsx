import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { api } from 'backend-client'
import { useEffect } from 'react'

export const Route = createFileRoute('/messages')({
	loader: async () => {
		const { data } = await api.messages.index.get()

		return {
			messages: data,
		}
	},
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({
				to: '/login',
			})
		}
	},
})

function RouteComponent() {
	const { messages } = Route.useLoaderData()

	useEffect(() => {
		api.messages.index.get().then((data) => {
			console.log('message', data)
		})
	}, [])

	if (!messages) {
		return <div>Loading...</div>
	}

	return (
		<div className="flex gap-2 p-2">
			<ul className="list-disc pl-4">
				{[...messages, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map((message) => {
					return (
						<li key={message.id} className="whitespace-nowrap">
							<Link
								to="/messages/$messageId"
								params={{
									messageId: message.id,
								}}
								className="block py-1 text-blue-800 hover:text-blue-600"
								activeProps={{ className: 'text-black font-bold' }}
							>
								<div>{message.title.substring(0, 20)}</div>
							</Link>
						</li>
					)
				})}
			</ul>
			<hr />
			<Outlet />
		</div>
	)
}
