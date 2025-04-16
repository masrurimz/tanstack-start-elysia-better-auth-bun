import type { Pokemon } from "./pokemon-entity";

export type PokemonPair = [Pokemon, Pokemon] | [];

export interface PokemonResult {
	dexId: number;
	name: string;
	upVotes: number;
	downVotes: number;
	winPercentage: number;
}

export interface PokemonVoteParams {
	votedForId: number;
	votedAgainstId: number;
}
