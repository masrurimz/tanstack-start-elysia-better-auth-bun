import { api } from "backend-client";
import type { PokemonPair, PokemonResult } from "../_domain/types";

class PokemonService {
	getPokemonPair = async (): Promise<PokemonPair> => {
		const { data } = await api.pokemon.pair.get();
		return data?.pair ?? [];
	};

	voteForPokemon = async ({
		votedForId,
		votedAgainstId,
	}: {
		votedForId: number;
		votedAgainstId: number;
	}) => {
		const result = await api.pokemon.vote.post({ votedForId, votedAgainstId });
		return result.data;
	};

	getPokemonResults = async (): Promise<PokemonResult[]> => {
		const { data } = await api.pokemon.results.get();
		return data ?? [];
	};
}

export const pokemonService = new PokemonService();
