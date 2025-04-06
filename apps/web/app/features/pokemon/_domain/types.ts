export interface Pokemon {
	id: number;
	name: string;
}

export type PokemonPair = [Pokemon, Pokemon] | [];

export interface PokemonResult {
	dexId: number;
	name: string;
	upVotes: number;
	downVotes: number;
	winPercentage: number;
}
