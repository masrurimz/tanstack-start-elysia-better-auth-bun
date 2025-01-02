import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('emailVerified', {
		mode: 'boolean',
	}).notNull(),
	image: text('image'),
	createdAt: integer('createdAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$onUpdateFn(() => new Date()),
})

export const session = sqliteTable('session', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	userId: text('userId')
		.notNull()
		.references(() => user.id),
	token: text('token').notNull(),
	expiresAt: integer('expiresAt', {
		mode: 'timestamp',
	}).notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	createdAt: integer('createdAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$onUpdateFn(() => new Date()),
})

export const account = sqliteTable('account', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	userId: text('userId')
		.notNull()
		.references(() => user.id),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	accessTokenExpiresAt: integer('accessTokenExpiresAt', {
		mode: 'timestamp',
	}),
	refreshTokenExpiresAt: integer('refreshTokenExpiresAt', {
		mode: 'timestamp',
	}),
	scope: text('scope'),
	password: text('password'),
	createdAt: integer('createdAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$onUpdateFn(() => new Date()),
})

export const verification = sqliteTable('verification', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expiresAt', {
		mode: 'timestamp',
	}).notNull(),
	createdAt: integer('createdAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updatedAt', {
		mode: 'timestamp',
	})
		.notNull()
		.$onUpdateFn(() => new Date()),
})

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert

export const usersRelations = relations(user, ({ many }) => ({
	notes: many(note),
	messages: many(message),
}))

export const note = sqliteTable('notes', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	title: text('title').notNull(),
	body: text('body').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, {
			onDelete: 'cascade',
		}),
	createdAt: integer('created_at', {
		mode: 'timestamp',
	}).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', {
		mode: 'timestamp',
	})
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdateFn(() => new Date()),
})

export type Note = typeof note.$inferSelect
export type NewNote = typeof note.$inferInsert

export const notesRelation = relations(note, ({ one }) => ({
	user: one(user, {
		fields: [note.userId],
		references: [user.id],
	}),
}))

export const pokemon = sqliteTable('pokemon', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
})

export type Pokemon = typeof pokemon.$inferSelect
export type NewPokemon = typeof pokemon.$inferInsert

export const vote = sqliteTable('votes', {
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

export type Vote = typeof vote.$inferSelect
export type NewVote = typeof vote.$inferInsert

export const voteRelation = relations(vote, ({ one }) => ({
	votedFor: one(pokemon, {
		relationName: 'votesFor',
		fields: [vote.votedForId],
		references: [pokemon.id],
	}),
	votedAgainst: one(pokemon, {
		relationName: 'votesAgainst',
		fields: [vote.votedAgainstId],
		references: [pokemon.id],
	}),
}))

export const pokemonRelation = relations(pokemon, ({ many }) => ({
	votesFor: many(vote, {
		relationName: 'votesFor',
	}),
	votesAgainst: many(vote, {
		relationName: 'votesAgainst',
	}),
}))

export const message = sqliteTable('messages', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	title: text('title').notNull(), // Add title field
	content: text('content').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, {
			onDelete: 'cascade',
		}),
	createdAt: integer('created_at', {
		mode: 'timestamp',
	})
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', {
		mode: 'timestamp',
	})
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdateFn(() => new Date()),
})

export type Message = typeof message.$inferSelect
export type NewMessage = typeof message.$inferInsert

export const messageRelation = relations(message, ({ one }) => ({
	user: one(user, {
		fields: [message.userId],
		references: [user.id],
	}),
}))
