export interface MessageRepository {
	findAll: () => Promise<MessageEntity[]>;
	findById: ({ id }: { id: string }) => Promise<MessageEntity | null>;
	create: ({
		params,
	}: {
		params: {
			title: string;
			content: string;
			userId: string;
		};
	}) => Promise<MessageEntity>;
	update: ({
		params,
	}: {
		params: {
			id: string;
			title: string;
			content: string;
		};
	}) => Promise<MessageEntity>;
	delete: ({ id }: { id: string }) => Promise<{ success: boolean }>;
}

export interface MessageEntity {
	id: string;
	title: string;
	content: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
}
