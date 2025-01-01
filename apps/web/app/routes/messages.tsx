import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/messages')({
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({
				to: '/login',
			})
		}
	},
})
