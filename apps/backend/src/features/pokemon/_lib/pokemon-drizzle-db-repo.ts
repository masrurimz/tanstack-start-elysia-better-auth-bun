import { db } from "@acme/db/client";
import { pokemon, vote } from "@acme/db/schema";
import { desc, eq, inArray, or, sql } from "drizzle-orm";
import type {
	PokemonVote,
	PokemonVoteParams,
} from "~/domain/entities/pokemon-entity";
import type { PokemonRepository } from "~/domain/repositories/pokemon-repository";

export class PokemonDrizzleDbRepository implements PokemonRepository {
	findById = async ({ ids }: { ids: number[] }) => {
		return db
			.select({
				id: pokemon.id,
				dexId: pokemon.id,
				name: pokemon.name,
			})
			.from(pokemon)
			.where(inArray(pokemon.id, ids));
	};

	createVote = async ({ params }: { params: PokemonVoteParams }) => {
		const voteResult = await db
			.insert(vote)
			.values({
				votedForId: params.votedForId,
				votedAgainstId: params.votedAgainstId,
			})
			.returning()
			.then((res) => res[0]);

		if (!voteResult) {
			throw new Error("Failed to create vote");
		}

		return voteResult;
	};

	getResults = async (): Promise<PokemonVote[]> => {
		return db
			.select({
				id: pokemon.id,
				dexId: pokemon.id,
				name: pokemon.name,
				upVotes: sql<number>`count(distinct ${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id})`,
				downVotes: sql<number>`count(distinct ${vote.id}) filter (where ${vote.votedAgainstId} = ${pokemon.id})`,
				winPercentage: sql<number>`
          case 
            when (count(${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id} or ${vote.votedAgainstId} = ${pokemon.id})) = 0 then 0
            else CAST(count(${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id}) AS FLOAT) * 100.0 / 
                 count(${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id} or ${vote.votedAgainstId} = ${pokemon.id})
          end
        `,
			})
			.from(pokemon)
			.leftJoin(
				vote,
				or(
					eq(vote.votedForId, pokemon.id),
					eq(vote.votedAgainstId, pokemon.id),
				),
			)
			.groupBy(pokemon.id, pokemon.name)
			.orderBy(
				desc(sql`case 
          when (count(${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id} or ${vote.votedAgainstId} = ${pokemon.id})) = 0 then 0
          else CAST(count(${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id}) AS FLOAT) * 100.0 / 
               count(${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id} or ${vote.votedAgainstId} = ${pokemon.id})
        end`),
				desc(
					sql`count(distinct ${vote.id}) filter (where ${vote.votedForId} = ${pokemon.id})`,
				),
			);
	};
}

export const pokemonRepository = new PokemonDrizzleDbRepository();
