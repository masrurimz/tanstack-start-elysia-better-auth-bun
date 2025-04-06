import type { User } from "@acme/db/schema";
import { messageRepository } from "./_lib/message-repository";

class MessageService {
	getAll = async () => {
		return messageRepository.findAll();
	};

	getById = async ({ id }: { id: string }) => {
		return messageRepository.findById({ id });
	};

	create = async ({
		title,
		content,
		userId,
	}: {
		title: string;
		content: string;
		userId: string;
	}) => {
		return messageRepository.create({
			params: {
				title,
				content,
				userId,
			},
		});
	};

	update = async ({
		id,
		title,
		content,
	}: {
		id: string;
		title: string;
		content: string;
	}) => {
		return messageRepository.update({
			params: {
				id,
				title,
				content,
			},
		});
	};

	delete = async ({ id }: { id: string }) => {
		return messageRepository.delete({ id });
	};

	// Sync operation that doesn't need await, but marked as async to maintain consistency
	validateAuth = async ({ user }: { user: Pick<User, "id"> | null }) => {
		if (!user?.id) {
			throw new Error("Unauthorized");
		}
		return await Promise.resolve(user);
	};

	validateOwnership = async ({
		id,
		userId,
	}: {
		id: string;
		userId: string;
	}) => {
		const message = await this.getById({ id });
		if (!message) {
			throw new Error("Message not found");
		}
		if (message.userId !== userId) {
			throw new Error("Unauthorized");
		}
		return message;
	};
}

export const messageService = new MessageService();
