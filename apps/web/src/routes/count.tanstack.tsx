import { createFileRoute } from "@tanstack/react-router";
import { CountCard } from "~/features/count/_components/count-card";
import { countTanStackController } from "~/features/count/_controllers/count-tanstack-controller";

export const Route = createFileRoute("/count/tanstack")({
  loader: async () => {
    const data = await countTanStackController.getCount();
    return { count: data?.count ?? 0 };
  },
  component: TanstackCountPage,
});

// Component that only displays the count
function CountDisplay() {
  const { data } = countTanStackController.useCount();

  return (
    <CountCard.Display
      count={data?.count.count ?? 0}
      description="Counter stored in local file using TanStack Query"
    />
  );
}

// Component that handles the actions
function CountActions() {
  const { incrementCount, isPending } = countTanStackController.useIncrementCount();
  const { isPending: isRefetching } = countTanStackController.useCount();

  return (
    <CountCard.Actions
      onIncrement={() => incrementCount()}
      onRefresh={() => window.location.reload()}
      isLoading={isPending || isRefetching}
    />
  );
}

// Main page component
function TanstackCountPage() {
  return (
    <div className="container py-10 flex flex-col items-center justify-center min-h-[80vh]">
      <CountCard>
        <CountCard.Header
          title="TanStack Query Counter"
          description="Counter implementation using TanStack Query and server functions"
        />
        <CountDisplay />
        <CountActions />
      </CountCard>
    </div>
  );
}
