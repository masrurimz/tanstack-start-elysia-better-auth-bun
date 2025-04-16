import { Await, createFileRoute } from "@tanstack/react-router";
import { ResultsLoader } from "~/features/pokemon/_components/pokemon-loader";
import { PokemonResultsList } from "~/features/pokemon/_components/pokemon-results-list";
import { pokemonController } from "~/features/pokemon/_controllers/pokemon-controller";

export const Route = createFileRoute("/pokemon/results")({
	loader: () => {
		const resultsPromise = pokemonController.getPokemonResults();
		return {
			pokemonResults: resultsPromise.then(({ results }) => results),
		};
	},
	component: ResultsPage,
	head: () => ({
		meta: [
			{
				title: "Results (Tanstack Start + Drizzle + Bun Stack Version)",
			},
		],
	}),
});

function ResultsPage() {
	const { pokemonResults } = Route.useLoaderData();

	return (
		<div className="container px-4 py-8 mx-auto text-white">
			<div className="grid gap-4">
				<Await promise={pokemonResults} fallback={<ResultsLoader />}>
					{(results) => <PokemonResultsList results={results} />}
				</Await>
			</div>
		</div>
	);
}
