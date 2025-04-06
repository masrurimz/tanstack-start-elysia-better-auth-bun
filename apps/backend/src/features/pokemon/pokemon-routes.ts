import { Elysia } from "elysia";
import {
	pokemonModel,
	pokemonUpdateModel,
	pokemonVoteModel,
} from "./_domain/pokemon-model";
import { pokemonService } from "./pokemon-service";

export const pokemon = new Elysia({
	prefix: "/pokemon",
})
	.decorate("pokemonService", pokemonService)
	.model({
		pokemon: pokemonModel,
		pokemonUpdate: pokemonUpdateModel,
		pokemonVote: pokemonVoteModel,
	})
	.onTransform(function log({ body, params, path, request: { method } }) {
		console.log(`${method} ${path}`, {
			body,
			params,
		});
	})
	.get("/pair", async ({ pokemonService }) => {
		return pokemonService.getRandomPair();
	})
	.post(
		"/vote",
		async ({ pokemonService, body }) => {
			return pokemonService.vote({ params: body });
		},
		{
			body: "pokemonVote",
		},
	)
	.get("/results", async ({ pokemonService }) => {
		return pokemonService.getResults();
	});
