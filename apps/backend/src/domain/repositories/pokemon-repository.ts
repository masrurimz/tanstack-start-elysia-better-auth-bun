import type { Pokemon, PokemonVoteParams } from "../entities/pokemon-entity";

export interface VoteResult {
	id: string | number;
	votedForId: number;
	votedAgainstId: number;
	createdAt?: string | Date | null;
}

export interface PokemonRepository {
	findById: ({ ids }: { ids: number[] }) => Promise<Pokemon[]>;
	createVote: ({
		params,
	}: {
		params: PokemonVoteParams;
	}) => Promise<VoteResult>;
	getResults: () => Promise<Pokemon[]>;
}
