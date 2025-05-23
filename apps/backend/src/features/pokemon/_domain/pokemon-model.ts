import { t } from "elysia";
// Elysia models for validation
export const pokemonModel = t.Object({
	name: t.String(),
	type: t.Array(t.String()),
	spriteUrl: t.Optional(t.String()),
});

export const pokemonVoteModel = t.Object({
	votedForId: t.Number(),
	votedAgainstId: t.Number(),
});
