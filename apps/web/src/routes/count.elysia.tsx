import { createFileRoute } from "@tanstack/react-router";
import { CountCard } from "~/features/count/_components/count-card";
import { countElysiaController } from "~/features/count/_controllers/count-elysia-controller";
import { elysiaCountQueryOptions } from "~/features/count/_lib/count-elysia-queries";

export const Route = createFileRoute("/count/elysia")({
  loader: async ({ context }) => {
    const { count } = await context.queryClient.ensureQueryData(
      elysiaCountQueryOptions(),
    );
    return { count };
  },
  component: ElysiaCountPage,
});

// Component that only displays the count
function CountDisplay() {
  const { data } = countElysiaController.useCount();

  return (
    <CountCard.Display
      count={data?.count ?? 0}
      description="Counter stored in Elysia backend using TanStack Query"
    />
  );
}

// Component that handles the actions
function CountActions() {
  const { incrementCount, isPending } = countElysiaController.useIncrementCount();
  const { isPending: isRefetching } = countElysiaController.useCount();

  return (
    <CountCard.Actions
      onIncrement={() => incrementCount()}
      onRefresh={() => window.location.reload()}
      isLoading={isPending || isRefetching}
    />
  );
}

// Main page component
function ElysiaCountPage() {
  return (
    <div className="container py-10 flex flex-col items-center justify-center min-h-[80vh]">
      <CountCard>
        <CountCard.Header
          title="Elysia Backend Counter"
          description="Counter implementation using Elysia backend API with TanStack Query"
        />
        <CountDisplay />
        <CountActions />
      </CountCard>
    </div>
  );
}
