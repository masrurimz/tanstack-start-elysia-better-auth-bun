import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/messages/form')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/messages/form"!</div>
}
