import type {
	PokemonPair,
	PokemonVote,
	PokemonVoteParams,
} from "~/domain/entities/pokemon-entity";
import { pokemonRepository } from "./_lib/pokemon-drizzle-db-repo";

function getTwoRandomNumbers(max: number) {
	const first = Math.floor(Math.random() * max) + 1;
	let second: number;
	do {
		second = Math.floor(Math.random() * max) + 1;
	} while (second === first);
	return [first, second] as const;
}

class PokemonService {
	getRandomPair = async (): Promise<PokemonPair> => {
		const [firstId, secondId] = getTwoRandomNumbers(1025);
		const pair = await pokemonRepository.findById({ ids: [firstId, secondId] });

		return { pair: [pair[0], pair[1]] };
	};

	vote = async ({ params }: { params: PokemonVoteParams }) => {
		if (params.votedForId === params.votedAgainstId) {
			throw new Error("Cannot vote for and against the same Pokemon");
		}

		return pokemonRepository.createVote({ params });
	};

	getResults = async (): Promise<PokemonVote[]> => {
		return pokemonRepository.getResults();
	};
}

export const pokemonService = new PokemonService();
