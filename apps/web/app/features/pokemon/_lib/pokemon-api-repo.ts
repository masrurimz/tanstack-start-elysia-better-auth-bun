import { api } from "backend-client";
import type {
	PokemonPair,
	PokemonResult,
	PokemonVoteParams,
} from "../_domain/pokemon-model";
import type { PokemonRepository } from "../_domain/pokemon-repository";

class PokemonApiRepository implements PokemonRepository {
	getPokemonPair = async (): Promise<PokemonPair> => {
		const { data } = await api.pokemon.pair.get();
		return data?.pair ?? [];
	};

	voteForPokemon = async ({
		votedForId,
		votedAgainstId,
	}: PokemonVoteParams): Promise<void> => {
		await api.pokemon.vote.post({ votedForId, votedAgainstId });
	};

	getPokemonResults = async (): Promise<PokemonResult[]> => {
		const { data } = await api.pokemon.results.get();
		return data ?? [];
	};
}

export const pokemonApiRepository = new PokemonApiRepository();
