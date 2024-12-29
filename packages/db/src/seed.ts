import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'

import { account, note, pokemon, user } from './schema'

async function getAllPokemon() {
	const query = `
    query GetAllPokemon {
      pokemon_v2_pokemon(where: {id: {_lte: 1025}}) {
        id
        pokemon_v2_pokemonspecy {
          name
        }
      }
    }
  `

	const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	})

	const responseData = (await response.json()) as {
		data: {
			pokemon_v2_pokemon: {
				id: number
				pokemon_v2_pokemonspecy: {
					name: string
				}
			}[]
		}
	}

	return responseData.data.pokemon_v2_pokemon.map((pokemon) => ({
		id: pokemon.id,
		name: pokemon.pokemon_v2_pokemonspecy.name,
	}))
}

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is required')
}

const client = createClient({
	url: process.env.DATABASE_URL,
	authToken: process.env.DATABASE_AUTH_TOKEN,
})

const db = drizzle(client)

async function seed() {
	await migrate(db, {
		migrationsFolder: `${process.env.ROOT_DIR}/packages/db/migrations`,
	})

	const newUser = await db
		.insert(user)
		.values({
			email: 'rachel@remix.run',
			createdAt: new Date(),
			updatedAt: new Date(),
			emailVerified: true,
			name: 'Rachel',
		})
		.returning()
		.get()

	const hash = await Bun.password.hash('racheliscool')
	await db.insert(account).values({
		userId: newUser.id,
		accountId: '',
		providerId: '',
		password: hash,
	})

	await db.insert(note).values([
		{
			title: 'My first note',
			body: 'This is my first note',
			userId: newUser.id,
		},
		{
			title: 'My second note',
			body: 'This is my second note',
			userId: newUser.id,
		},
	])

	// Seed Pokemon
	const allPokemon = await getAllPokemon()
	await db.insert(pokemon).values(allPokemon)

	console.log(`Created ${allPokemon.length} Pokemon`)
	console.log('Database has been seeded. 🌱')
	process.exit(0)
}

seed()
