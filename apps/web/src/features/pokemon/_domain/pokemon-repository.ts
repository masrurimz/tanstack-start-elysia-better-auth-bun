import type {
	PokemonPair,
	PokemonResult,
	PokemonVoteParams,
} from "./pokemon-model";

export interface PokemonRepository {
	getPokemonPair: () => Promise<PokemonPair>;
	voteForPokemon: ({
		votedForId,
		votedAgainstId,
	}: PokemonVoteParams) => Promise<void>;
	getPokemonResults: () => Promise<PokemonResult[]>;
}
