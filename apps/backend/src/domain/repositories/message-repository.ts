import type {
	CreateMessageParams,
	Message,
	MessageWithUser,
	UpdateMessageParams,
} from "../entities/message-entity";

export interface MessageRepository {
	findAll: () => Promise<MessageWithUser[]>;
	findById: ({ id }: { id: string }) => Promise<MessageWithUser | undefined>;
	create: ({ params }: { params: CreateMessageParams }) => Promise<Message[]>;
	update: ({ params }: { params: UpdateMessageParams }) => Promise<Message[]>;
	delete: ({ id }: { id: string }) => Promise<Message[]>;
}
