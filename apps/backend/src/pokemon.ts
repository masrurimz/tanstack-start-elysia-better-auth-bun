import { Elysia, t } from 'elysia'
import { db } from '@acme/db/client'
import { eq, or, sql, desc } from 'drizzle-orm'
import { pokemon, vote as votes } from '@acme/db/schema'

function getTwoRandomNumbers(max: number) {
	const first = Math.floor(Math.random() * max) + 1
	let second: number
	do {
		second = Math.floor(Math.random() * max) + 1
	} while (second === first)
	return [first, second] as const
}

export const pokemonRoutes = new Elysia({ prefix: '/pokemon' })
	.get('/pair', async () => {
		const [firstId, secondId] = getTwoRandomNumbers(1025)
		const pair = await db.query.pokemon.findMany({
			where: (pokemon) => or(eq(pokemon.id, firstId), eq(pokemon.id, secondId)),
		})
		return { pair: [pair[0], pair[1]] }
	})
	.post(
		'/vote',
		async ({ body }) => {
			if (body.votedForId === body.votedAgainstId) {
				throw new Error('Cannot vote for and against the same Pokemon')
			}

			return db
				.insert(votes)
				.values({
					votedForId: body.votedForId,
					votedAgainstId: body.votedAgainstId,
				})
				.returning()
				.get()
		},
		{
			body: t.Object({
				votedForId: t.Number(),
				votedAgainstId: t.Number(),
			}),
		},
	)
	.get('/results', async () => {
		const results = await db
			.select({
				dexId: pokemon.id,
				name: pokemon.name,
				upVotes: sql<number>`count(distinct ${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id})`,
				downVotes: sql<number>`count(distinct ${votes.id}) filter (where ${votes.votedAgainstId} = ${pokemon.id})`,
				winPercentage: sql<number>`
        case 
          when (count(${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id} or ${votes.votedAgainstId} = ${pokemon.id})) = 0 then 0
          else CAST(count(${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id}) AS FLOAT) * 100.0 / 
               count(${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id} or ${votes.votedAgainstId} = ${pokemon.id})
        end
      `,
			})
			.from(pokemon)
			.leftJoin(votes, or(eq(votes.votedForId, pokemon.id), eq(votes.votedAgainstId, pokemon.id)))
			.groupBy(pokemon.id, pokemon.name)
			.orderBy(
				desc(sql`case 
        when (count(${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id} or ${votes.votedAgainstId} = ${pokemon.id})) = 0 then 0
        else CAST(count(${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id}) AS FLOAT) * 100.0 / 
             count(${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id} or ${votes.votedAgainstId} = ${pokemon.id})
      end`),
				desc(sql`count(distinct ${votes.id}) filter (where ${votes.votedForId} = ${pokemon.id})`),
			)

		return results
	})
