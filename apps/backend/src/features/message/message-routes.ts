import { Elysia, t } from "elysia";
import { betterAuthMiddleware } from "~/middlewares/auth-middleware";
import { messageModel, messageResponseModel } from "./_domain/message-model";
import { messageService } from "./message-service";

// Main message router
export const message = new Elysia({
	prefix: "/messages",
})
	.decorate("messageService", messageService)
	.model({
		message: messageModel,
	})
	.onTransform(({ body, params, path, request: { method } }) => {
		console.log(`${method} ${path}`, {
			body,
			params,
		});
	})

	// Public routes
	.get(
		"/",
		async ({ messageService }) => {
			const messages = await messageService.getAll();
			return { success: true, data: messages };
		},
		{
			response: t.Object({
				success: t.Boolean(),
				data: t.Array(messageResponseModel),
			}),
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
		"/",
		async ({ body, messageService, error, user }) => {
			try {
				const result = await messageService.create({
					title: body.title,
					content: body.content,
					userId: user.id,
				});

				return {
					success: true,
					message: "Message created successfully",
					data: result,
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
			detail: {
				summary: "Create a new message",
				tags: ["Messages"],
				security: [{ BearerAuth: [] }],
			},
		},
	)

	// Routes that require a message ID
	.guard({
		params: t.Object({
			id: t.String(),
		}),
	})
	.get(
		"/:id",
		async ({ params: { id }, messageService, error }) => {
			const message = await messageService.getById({ id });

			if (!message) {
				return error(404, { success: false, message: "Message not found" });
			}

			return { success: true, data: message };
		},
		{
			detail: {
				summary: "Get message by ID",
				tags: ["Messages"],
			},
		},
	)
	.patch(
		"/:id",
		async ({ params: { id }, body, messageService, error, user }) => {
			try {
				// Validate ownership
				const existingMessage = await messageService.getById({ id });

				if (!existingMessage) {
					return error(404, { success: false, message: "Message not found" });
				}

				if (existingMessage.userId !== user.id) {
					return error(403, {
						success: false,
						message: "You don't have permission to update this message",
					});
				}

				const result = await messageService.update({
					id,
					title: body.title,
					content: body.content,
				});

				return {
					success: true,
					message: "Message updated successfully",
					data: result,
				};
			} catch (err) {
				return error(500, {
					success: false,
					message:
						err instanceof Error ? err.message : "Failed to update message",
				});
			}
		},
		{
			body: "message",
			detail: {
				summary: "Update a message",
				tags: ["Messages"],
				security: [{ BearerAuth: [] }],
			},
		},
	)
	.delete(
		"/:id",
		async ({ params: { id }, user, messageService, error }) => {
			try {
				// Validate ownership
				const existingMessage = await messageService.getById({ id });

				if (!existingMessage) {
					return error(404, { success: false, message: "Message not found" });
				}

				if (existingMessage.userId !== user.id) {
					return error(403, {
						success: false,
						message: "You don't have permission to delete this message",
					});
				}

				const result = await messageService.delete({ id });

				return {
					success: true,
					message: "Message deleted successfully",
					data: result,
				};
			} catch (err) {
				return error(500, {
					success: false,
					message:
						err instanceof Error ? err.message : "Failed to delete message",
				});
			}
		},
		{
			detail: {
				summary: "Delete a message",
				tags: ["Messages"],
				security: [{ BearerAuth: [] }],
			},
		},
	);
