export interface Pokemon {
	id: number;
	dexId: number;
	name: string;
}

export interface PokemonVote extends Pokemon {
	winPercentage: number;
	upVotes: number;
	downVotes: number;
}

export interface PokemonPair {
	pair: [Pokemon, Pokemon];
}

export interface PokemonVoteParams {
	votedForId: number;
	votedAgainstId: number;
}

export interface VoteResult {
	id: string | number;
	votedForId: number;
	votedAgainstId: number;
	createdAt?: string | Date | null;
}
