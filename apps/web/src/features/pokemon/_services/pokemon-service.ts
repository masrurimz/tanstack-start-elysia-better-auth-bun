import type {
	PokemonPair,
	PokemonResult,
	PokemonVoteParams,
} from "../_domain/pokemon-model";
import { pokemonApiRepository } from "../_lib/pokemon-api-repo";

class PokemonService {
	getPokemonPair = async (): Promise<PokemonPair> => {
		return pokemonApiRepository.getPokemonPair();
	};

	voteForPokemon = async ({
		votedForId,
		votedAgainstId,
	}: PokemonVoteParams): Promise<void> => {
		await pokemonApiRepository.voteForPokemon({ votedForId, votedAgainstId });
	};

	getPokemonResults = async (): Promise<PokemonResult[]> => {
		return pokemonApiRepository.getPokemonResults();
	};
}

export const pokemonService = new PokemonService();
