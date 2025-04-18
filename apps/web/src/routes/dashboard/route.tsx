import { Link, Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    if (!context.session?.user) {
      throw redirect({ to: "/signin" });
    }

    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
});

function DashboardLayout() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">Dashboard Layout</h1>
      <div className="flex gap-2 items-center">
        This is a protected layout:
        <pre className="p-1 rounded-md border bg-card text-card-foreground">
          routes/dashboard/route.tsx
        </pre>
      </div>

      <Button type="button" asChild className="w-fit" size="lg">
        <Link to="/">Back to Home</Link>
      </Button>

      <Outlet />
    </div>
  );
}
