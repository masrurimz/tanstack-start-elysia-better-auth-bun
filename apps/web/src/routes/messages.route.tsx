import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/messages")({
  component: MessagesLayout,
});

function MessagesLayout() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <Outlet />
    </div>
  );
}
