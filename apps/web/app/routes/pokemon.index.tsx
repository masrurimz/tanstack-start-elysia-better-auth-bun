import { createFileRoute } from "@tanstack/react-router";
import { PokemonCard } from "~/features/pokemon/_components/pokemon-card";
import { PokemonLoader } from "~/features/pokemon/_components/pokemon-loader";
import { pokemonController } from "~/features/pokemon/_controllers/pokemon-controller";
import type { Pokemon } from "~/features/pokemon/_domain/pokemon-entity";

export const Route = createFileRoute("/pokemon/")({
	loader: async () => {
		const { pokemonPair } = await pokemonController.getPokemonPair();
		return { pokemonPair };
	},
	component: VotePage,
});

function VotePage() {
	const { pokemonPair } = Route.useLoaderData();
	const { isPending } = pokemonController.useIsPendingVote();
	const { voteForPokemon } = pokemonController.useVoteForPokemon();

	if (!pokemonPair[0] || !pokemonPair[1]) {
		return (
			<div className="font-bold text-2xl text-red-500">
				No more Pokemon to vote on!
			</div>
		);
	}

	const [pokemonOne, pokemonTwo] = pokemonPair as [Pokemon, Pokemon];

	return (
		<div className="flex min-h-[80vh] items-center justify-center gap-16">
			{isPending ? (
				<PokemonLoader />
			) : (
				<>
					<PokemonCard
						id={pokemonOne.id}
						name={pokemonOne.name}
						isVoting={isPending}
						onVote={({ id }) =>
							voteForPokemon({
								votedForId: id,
								votedAgainstId: pokemonTwo.id,
							})
						}
					/>
					<PokemonCard
						id={pokemonTwo.id}
						name={pokemonTwo.name}
						isVoting={isPending}
						onVote={({ id }) =>
							voteForPokemon({
								votedForId: id,
								votedAgainstId: pokemonOne.id,
							})
						}
					/>
				</>
			)}
		</div>
	);
}

export function VoteFallback() {
	return (
		<>
			{[1, 2].map((i) => (
				<div key={i} className="flex flex-col items-center gap-4">
					<div className="h-64 w-64 animate-pulse rounded-lg bg-gray-800/10" />
					<div className="flex flex-col items-center justify-center space-y-2 text-center">
						<div className="h-6 w-16 animate-pulse rounded bg-gray-800/10" />
						<div className="h-8 w-32 animate-pulse rounded bg-gray-800/10" />
						<div className="h-12 w-24 animate-pulse rounded bg-gray-800/10" />
					</div>
				</div>
			))}
		</>
	);
}
