import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	email: text('email').unique().notNull(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const usersRelations = relations(users, ({ many, one }) => ({
	password: one(passwords, {
		fields: [users.id],
		references: [passwords.userId],
	}),
	notes: many(notes),
}))

export const passwords = sqliteTable('passwords', {
	hash: text('hash').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade',
		}),
})

export type Password = typeof passwords.$inferSelect
export type NewPassword = typeof passwords.$inferInsert

export const notes = sqliteTable('notes', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	body: text('body').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade',
		}),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export type Note = typeof notes.$inferSelect
export type NewNote = typeof notes.$inferInsert

export const notesRelations = relations(notes, ({ one }) => ({
	user: one(users, {
		fields: [notes.userId],
		references: [users.id],
	}),
}))

export const pokemon = sqliteTable('pokemon', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
})

export type Pokemon = typeof pokemon.$inferSelect
export type NewPokemon = typeof pokemon.$inferInsert

export const votes = sqliteTable('votes', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	votedForId: integer('voted_for_id')
		.notNull()
		.references(() => pokemon.id),
	votedAgainstId: integer('voted_against_id')
		.notNull()
		.references(() => pokemon.id),
})

export type Vote = typeof votes.$inferSelect
export type NewVote = typeof votes.$inferInsert

export const voteRelations = relations(votes, ({ one }) => ({
	votedFor: one(pokemon, {
		relationName: 'votesFor',
		fields: [votes.votedForId],
		references: [pokemon.id],
	}),
	votedAgainst: one(pokemon, {
		relationName: 'votesAgainst',
		fields: [votes.votedAgainstId],
		references: [pokemon.id],
	}),
}))

export const pokemonRelations = relations(pokemon, ({ many }) => ({
	votesFor: many(votes, {
		relationName: 'votesFor',
	}),
	votesAgainst: many(votes, {
		relationName: 'votesAgainst',
	}),
}))
