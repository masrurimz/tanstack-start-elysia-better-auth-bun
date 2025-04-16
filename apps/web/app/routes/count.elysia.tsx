import { createFileRoute } from "@tanstack/react-router";
import { CountCard } from "~/features/count/_components/count-card";
import { countElysiaController } from "~/features/count/_controllers/count-elysia-controller";

export const Route = createFileRoute("/count/elysia")({
	loader: async () => {
		// Fetch initial count using the controller
		const count = await countElysiaController.getCount();
		return { count };
	},
	component: ElysiaCountPage,
});

// Component that only displays the count
function CountDisplay() {
	const count = countElysiaController.useCountValue();

	return (
		<CountCard.Display
			count={count}
			description="Counter stored in Elysia backend"
		/>
	);
}

// Component that handles the actions
function CountActions() {
	const isLoading = countElysiaController.useIsLoading();
	const incrementCount = countElysiaController.useIncrementCount();
	const refreshCount = countElysiaController.useFetchCount();

	return (
		<CountCard.Actions
			onIncrement={incrementCount}
			onRefresh={refreshCount}
			isLoading={isLoading}
		/>
	);
}

// Main page component
function ElysiaCountPage() {
	const { count: initialCount } = Route.useLoaderData();
	countElysiaController.useInitializeCount(initialCount);

	return (
		<div className="container py-10 flex flex-col items-center justify-center min-h-[80vh]">
			<CountCard>
				<CountCard.Header
					title="Elysia Backend Counter"
					description="Counter implementation using Elysia backend API"
				/>
				<CountDisplay />
				<CountActions />
			</CountCard>
		</div>
	);
}
