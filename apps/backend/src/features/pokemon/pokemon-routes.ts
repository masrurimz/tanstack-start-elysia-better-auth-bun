import { Elysia } from "elysia";
import { pokemonModel, pokemonVoteModel } from "./_domain/pokemon-model";
import { pokemonService } from "./pokemon-service";

export const pokemon = new Elysia({
	prefix: "/pokemon",
})
	.decorate("pokemonService", pokemonService)
	.model({
		pokemon: pokemonModel,
		pokemonVote: pokemonVoteModel,
	})
	.onTransform(function log({ body, params, path, request: { method } }) {
		console.log(`${method} ${path}`, {
			body,
			params,
		});
	})
	.get(
		"/pair",
		async ({ pokemonService }) => {
			return pokemonService.getRandomPair();
		},
		{
			detail: {
				summary: "Get a random pair of Pokemon",
				description: "Returns two random Pokemon to be used for voting",
				tags: ["Pokemon"],
				responses: {
					200: {
						description: "A pair of Pokemon returned successfully",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},
	)
	.post(
		"/vote",
		async ({ pokemonService, body }) => {
			return pokemonService.vote({ params: body });
		},
		{
			body: "pokemonVote",
			detail: {
				summary: "Vote for a Pokemon",
				description: "Records a vote for one Pokemon against another",
				tags: ["Pokemon"],
				responses: {
					200: {
						description: "Vote recorded successfully",
					},
					400: {
						description: "Invalid vote parameters",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},
	)
	.get(
		"/results",
		async ({ pokemonService }) => {
			return pokemonService.getResults();
		},
		{
			detail: {
				summary: "Get voting results",
				description: "Returns the current voting results for all Pokemon",
				tags: ["Pokemon"],
				responses: {
					200: {
						description: "Results returned successfully",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},
	);
