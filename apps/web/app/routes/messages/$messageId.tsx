import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/messages/$messageId')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/messages/$messageId"!</div>
}
