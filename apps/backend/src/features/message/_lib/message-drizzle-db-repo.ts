import { db } from "@acme/db/client";
import { message } from "@acme/db/schema";
import { eq } from "drizzle-orm";
import type {
	CreateMessageParams,
	MessageWithUser,
	UpdateMessageParams,
} from "~/domain/entities/message-entity";
import type { MessageRepository } from "~/domain/repositories/message-repository";

export class MessageDrizzleDbRepository implements MessageRepository {
	findAll = async () => {
		return db.query.message.findMany({
			with: { user: true },
		}) as Promise<MessageWithUser[]>;
	};

	findById = async ({ id }: { id: string }) => {
		return db.query.message.findFirst({
			where: eq(message.id, id),
			with: { user: true },
		}) as Promise<MessageWithUser | undefined>;
	};

	create = async ({ params }: { params: CreateMessageParams }) => {
		return db
			.insert(message)
			.values({
				title: params.title,
				content: params.content,
				userId: params.userId,
			})
			.returning();
	};

	update = async ({ params }: { params: UpdateMessageParams }) => {
		return db
			.update(message)
			.set({
				title: params.title,
				content: params.content,
				updatedAt: new Date(),
			})
			.where(eq(message.id, params.id))
			.returning();
	};

	delete = async ({ id }: { id: string }) => {
		return db.delete(message).where(eq(message.id, id)).returning();
	};
}
