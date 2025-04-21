import { Elysia } from "elysia";
import {
	countIncrementResponseModel,
	countResponseModel,
} from "./_domain/count-model";
import { countService } from "./count-service";

export const count = new Elysia({
	prefix: "/count",
})
	.decorate("countService", countService)
	.model({
		countResponse: countResponseModel,
		countIncrementResponse: countIncrementResponseModel,
	})
	.onTransform(({ path, request: { method } }) => {
		console.log(`${method} ${path}`);
	})
	.get(
		"/index",
		({ countService }) => {
			return countService.getCount();
		},
		{
			detail: {
				summary: "Get the current count",
				description: "Returns the current count value",
				tags: ["Count"],
				responses: {
					200: {
						description: "Count returned successfully",
					},
				},
			},
			response: "countResponse",
		},
	)
	.post(
		"/increment",
		async ({ countService }) => {
			return await countService.increment();
		},
		{
			detail: {
				summary: "Increment the count",
				description: "Increases the count by 1 and returns the new value",
				tags: ["Count"],
				responses: {
					200: {
						description: "Count incremented successfully",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
			response: "countIncrementResponse",
		},
	);
