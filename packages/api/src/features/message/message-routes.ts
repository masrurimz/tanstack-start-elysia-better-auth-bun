import { Elysia, t } from "elysia";
import { betterAuthMiddleware } from "../../middlewares/auth-middleware";
import {
	messageIdParam,
	messageModel,
	messageResponseModel,
	messageUpdateModel,
} from "./_domain/message-model";
import { messageService } from "./message-service";

// Main message router
export const message = new Elysia({
	prefix: "/message",
})
	.decorate("messageService", messageService)
	.model({
		message: messageModel,
		messageResponse: messageResponseModel,
		messageUpdate: messageUpdateModel,
		messageIdParam: messageIdParam,
	})
	.onTransform(({ body, params, path, request: { method } }) => {
		console.log(`${method} ${path}`, {
			body,
			params,
		});
	})

	// Public routes
	.get(
		"/index",
		async ({ messageService }) => {
			const messages = await messageService.getAll();
			return { success: true, messages };
		},
		{
			// response: t.Object({
			// 	success: t.Boolean(),
			// 	messages: t.Array(messageResponseModel),
			// }),
			detail: {
				summary: "Get all messages",
				tags: ["Messages"],
			},
		},
	)

	// Authentication middleware
	.use(betterAuthMiddleware)
	.guard({
		auth: true,
	})

	// Protected routes
	.post(
		"/index",
		async ({ body, messageService, error, user }) => {
			try {
				const message = await messageService.create({
					title: body.title,
					content: body.content,
					userId: user.id,
				});

				return {
					success: true,
					message: "Message created successfully",
					result: message,
				};
			} catch (err) {
				console.error("[ERROR]", err);

				return error(500, {
					success: false,
					message:
						err instanceof Error ? err.message : "Failed to create message",
				});
			}
		},
		{
			auth: true,
			body: "message",
			// response: t.Object({
			// 	success: t.Boolean(),
			// 	message: t.String(),
			// 	result: messageResponseModel,
			// }),
			detail: {
				summary: "Create a new message",
				tags: ["Messages"],
				security: [{ BearerAuth: [] }],
			},
		},
	)

	// Routes that require a message ID
	.group("/:id", (app) =>
		app
			.get(
				"/",
				async ({ params, messageService, error }) => {
					try {
						const message = await messageService.getById({ id: params.id });

						if (!message) {
							return error(404, {
								success: false,
								message: "Message not found",
							});
						}

						return { success: true, message };
					} catch (err) {
						console.error("[ERROR]", err);

						return error(500, {
							success: false,
							message: err instanceof Error ? err.message : "An error occurred",
						});
					}
				},
				{
					params: messageIdParam,
					// response: t.Object({
					// 	success: t.Boolean(),
					// 	message: messageResponseModel,
					// }),
					detail: {
						summary: "Get a message by ID",
						tags: ["Messages"],
					},
				},
			)
			.patch(
				"/",
				async ({ params, body, messageService, error, user }) => {
					try {
						// Validate ownership
						await messageService.validateOwnership({
							id: params.id,
							userId: user.id,
						});

						// Update message
						const message = await messageService.update({
							id: params.id,
							title: body.title,
							content: body.content,
						});

						return {
							success: true,
							message: "Message updated successfully",
							result: message,
						};
					} catch (err) {
						console.error("[ERROR]", err);

						if (err instanceof Error && err.message === "Message not found") {
							return error(404, {
								success: false,
								message: "Message not found",
							});
						}

						if (err instanceof Error && err.message === "Unauthorized") {
							return error(403, {
								success: false,
								message: "You are not authorized to update this message",
							});
						}

						return error(500, {
							success: false,
							message: err instanceof Error ? err.message : "An error occurred",
						});
					}
				},
				{
					auth: true,
					params: messageIdParam,
					body: "messageUpdate",
					// response: t.Object({
					//   success: t.Boolean(),
					//   message: t.String(),
					//   result: messageResponseModel,
					// }),
					detail: {
						summary: "Update a message",
						tags: ["Messages"],
						security: [{ BearerAuth: [] }],
					},
				},
			)
			.delete(
				"/",
				async ({ params, messageService, error, user }) => {
					try {
						// Validate ownership
						await messageService.validateOwnership({
							id: params.id,
							userId: user.id,
						});

						// Delete message
						const result = await messageService.delete({ id: params.id });

						return {
							success: true,
							message: "Message deleted successfully",
							result,
						};
					} catch (err) {
						console.error("[ERROR]", err);

						if (err instanceof Error && err.message === "Message not found") {
							return error(404, {
								success: false,
								message: "Message not found",
							});
						}

						if (err instanceof Error && err.message === "Unauthorized") {
							return error(403, {
								success: false,
								message: "You are not authorized to delete this message",
							});
						}

						return error(500, {
							success: false,
							message: err instanceof Error ? err.message : "An error occurred",
						});
					}
				},
				{
					auth: true,
					params: messageIdParam,
					// response: t.Object({
					// 	success: t.Boolean(),
					// 	message: t.String(),
					// 	result: t.Object({
					// 		success: t.Boolean(),
					// 	}),
					// }),
					detail: {
						summary: "Delete a message",
						tags: ["Messages"],
						security: [{ BearerAuth: [] }],
					},
				},
			),
	);
