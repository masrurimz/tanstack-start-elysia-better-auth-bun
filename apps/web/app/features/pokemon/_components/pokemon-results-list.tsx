import type { PokemonResult } from "../_domain/types";
import { PokemonSprite } from "./pokemon-sprite";

interface PokemonResultsListProps {
	results: PokemonResult[];
}

export const PokemonResultsList = ({ results }: PokemonResultsListProps) => {
	return (
		<>
			{results.map((pokemon, index) => (
				<div
					key={pokemon.dexId}
					className="flex items-center p-6 rounded-lg shadow gap-6 transition-shadow bg-gray-800/40 hover:shadow-md"
				>
					<div className="w-8 text-2xl font-bold text-gray-400">
						#{index + 1}
					</div>
					<PokemonSprite dexId={pokemon.dexId} className="w-20 h-20" />
					<div className="flex-grow">
						<div className="text-sm text-gray-400">#{pokemon.dexId}</div>
						<h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-blue-400">
							{pokemon.winPercentage.toFixed(1)}%
						</div>
						<div className="text-sm text-gray-400">
							{pokemon.upVotes}W - {pokemon.downVotes}L
						</div>
					</div>
				</div>
			))}
		</>
	);
};
