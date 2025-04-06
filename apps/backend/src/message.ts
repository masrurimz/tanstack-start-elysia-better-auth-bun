import { db } from "@acme/db/client";
import type { User } from "@acme/db/schema";
import { message } from "@acme/db/schema";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { userMiddleware } from "./middlewares/auth-middleware";
import { getUserId } from "./user";

// Message models
const messageSchema = {
	title: t.String({
		minLength: 1,
		description: "Message title",
	}),
	content: t.String({
		minLength: 1,
		description: "Message content",
	}),
};

const messageModel = t.Object(messageSchema, {
	description: "Message payload",
});

const messageResponseModel = t.Object(
	{
		id: t.String(),
		title: t.String(),
		content: t.String(),
		userId: t.String(),
		createdAt: t.Date(),
		updatedAt: t.Date(),
		user: t.Object({
			id: t.String(),
			name: t.String(),
			email: t.String(),
			image: t.Optional(t.Nullable(t.String())),
		}),
	},
	{
		description: "Message response with user details",
	},
);

// Message service class
class Message {
	async get() {
		return db.query.message.findMany({
			with: { user: true },
		});
	}

	async getById(id: string) {
		return db.query.message.findFirst({
			where: eq(message.id, id),
			with: { user: true },
		});
	}

	async create(userId: string, title: string, content: string) {
		return db.insert(message).values({ title, content, userId }).returning();
	}

	async update(id: string, title: string, content: string) {
		return db
			.update(message)
			.set({ title, content, updatedAt: new Date() })
			.where(eq(message.id, id))
			.returning();
	}

	async delete(id: string) {
		return db.delete(message).where(eq(message.id, id)).returning();
	}

	async validateAuth(user: Pick<User, "id"> | null) {
		if (!user?.id) {
			throw new Error("Unauthorized");
		}
		return user;
	}

	async validateOwnership(id: string, userId: string) {
		const msg = await this.getById(id);
		if (!msg) {
			throw new Error("Message not found");
		}
		if (msg.userId !== userId) {
			throw new Error("Unauthorized");
		}
		return msg;
	}
}

// Message routes
const messageService = new Elysia({ prefix: "/messages" })
	.model({ message: messageModel })
	.derive(({ request }) => userMiddleware(request))
	.decorate("message", new Message())

	// Public routes
	.get("/index", async ({ message }) => await message.get(), {
		response: t.Array(messageResponseModel),
		detail: {
			summary: "Get all messages",
			tags: ["Messages"],
			description: "Retrieve all messages with user information",
		},
	})

	// Protected routes
	.guard(
		{
			detail: {
				description: "Requires authentication",
				security: [{ BearerAuth: [] }],
			},
		},
		(app) =>
			app
				.use(getUserId)
				.post(
					"/index",
					async ({ body: { title, content }, user, message }) => {
						const validUser = await message.validateAuth(user);
						return message.create(validUser.id, title, content);
					},
					{
						body: "message",
						response: t.Array(messageModel),
						detail: {
							summary: "Create a new message",
							tags: ["Messages"],
						},
					},
				)
				.guard(
					{
						detail: {
							description: "Requires message ownership",
						},
					},
					(app) =>
						app
							.patch(
								"/:id",
								async ({
									params: { id },
									body: { title, content },
									user,
									message,
								}) => {
									const validUser = await message.validateAuth(user);
									await message.validateOwnership(id, validUser.id);
									return message.update(id, title, content);
								},
								{
									params: t.Object({ id: t.String() }),
									body: "message",
									response: t.Array(messageModel),
									detail: {
										summary: "Update a message",
										tags: ["Messages"],
									},
								},
							)
							.delete(
								"/:id",
								async ({ params: { id }, user, message }) => {
									const validUser = await message.validateAuth(user);
									await message.validateOwnership(id, validUser.id);
									return message.delete(id);
								},
								{
									params: t.Object({ id: t.String() }),
									response: t.Array(messageModel),
									detail: {
										summary: "Delete a message",
										tags: ["Messages"],
									},
								},
							),
				),
	);

export { messageService };
