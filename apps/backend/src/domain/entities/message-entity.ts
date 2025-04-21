export interface Message {
	id: string;
	title: string;
	content: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface MessageWithUser extends Message {
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
	};
}

export interface CreateMessageParams {
	title: string;
	content: string;
	userId: string;
}

export interface UpdateMessageParams {
	id: string;
	title: string;
	content: string;
}
