import { createFileRoute } from "@tanstack/react-router";
import { CountCard } from "~/features/count/_components/count-card";
import { countTanStackController } from "~/features/count/_controllers/count-tanstack-controller";

export const Route = createFileRoute("/count/tanstack")({
	loader: async () => {
		// Fetch initial count using the controller
		const count = await countTanStackController.getCount();
		return { count };
	},
	component: TanstackCountPage,
});

// Component that only displays the count
function CountDisplay() {
	const count = countTanStackController.useCountValue();

	return (
		<CountCard.Display
			count={count}
			description="Counter stored in local file using TanStack Start"
		/>
	);
}

// Component that handles the actions
function CountActions() {
	const isLoading = countTanStackController.useIsLoading();
	const incrementCount = countTanStackController.useIncrementCount();
	const refreshCount = countTanStackController.useFetchCount();

	return (
		<CountCard.Actions
			onIncrement={incrementCount}
			onRefresh={refreshCount}
			isLoading={isLoading}
		/>
	);
}

// Main page component
function TanstackCountPage() {
	const { count: initialCount } = Route.useLoaderData();
	countTanStackController.useInitializeCount(initialCount);

	return (
		<div className="container py-10 flex flex-col items-center justify-center min-h-[80vh]">
			<CountCard>
				<CountCard.Header
					title="TanStack Start Counter"
					description="Counter implementation using TanStack Start's server functions"
				/>
				<CountDisplay />
				<CountActions />
			</CountCard>
		</div>
	);
}
